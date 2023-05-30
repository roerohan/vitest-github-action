import type {
	CoverageProviderModule,
	ReportContext,
	ResolvedCoverageOptions,
	AfterSuiteRunMeta,
	CoverageIstanbulOptions,
	Vitest,
} from 'vitest';
import type {CoverageProvider} from 'vitest';

import {type CoverageMap} from 'istanbul-lib-coverage';
import libCoverage from 'istanbul-lib-coverage';
import libSourceMaps from 'istanbul-lib-source-maps';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';
import GithubIstanbulCoverageReporter from './GithubIstanbulCoverageReporter';
import GithubSummaryIstanbulCoverageReporter from './GithubSummaryIstanbulCoverageReporter';
import {existsSync, promises as fs} from 'node:fs';
import {relative, resolve} from 'pathe';
import {
	coverageConfigDefaults,
	defaultExclude,
	defaultInclude,
} from 'vitest/config';
import {BaseCoverageProvider} from 'vitest/coverage';
import {type Instrumenter, createInstrumenter} from 'istanbul-lib-instrument';
import _TestExclude from 'test-exclude';
import github from '@actions/github';

const githubIstanbulCoverageProviderModule: CoverageProviderModule = {
	getProvider(): CoverageProvider {
		return new GithubIstanbulCoverageProvider();
	},

	// Implements rest of the CoverageProviderModule ...
};
export const coverageStorageKey = '__VITEST_COVERAGE__';
type Options = ResolvedCoverageOptions<'istanbul'>;

export type Octokit = ReturnType<typeof github.getOctokit>;
export type Github = typeof github;
const octokit: Octokit = github.getOctokit(process.env?.GITHUB_TOKEN ?? '');

export class GithubIstanbulCoverageProvider
	extends BaseCoverageProvider
	implements CoverageProvider {
	name = 'github-istanbul';

	ctx!: Vitest;
	options!: Options;
	instrumenter!: Instrumenter;
	testExclude!: InstanceType<TestExclude>;

	/**
	 * Coverage objects collected from workers.
	 * Some istanbul utilizers write these into file system instead of storing in memory.
	 * If storing in memory causes issues, we can simply write these into fs in `onAfterSuiteRun`
	 * and read them back when merging coverage objects in `onAfterAllFilesRun`.
	 */
	declare coverages: libCoverage.CoverageMap[];

	initialize(ctx: Vitest) {
		const config: CoverageIstanbulOptions = ctx.config.coverage;

		this.ctx = ctx;
		this.options = {
			...coverageConfigDefaults,

			// User's options
			...config,

			// Resolved fields
			provider: 'istanbul',
			reportsDirectory: resolve(
				ctx.config.root,
				config.reportsDirectory || coverageConfigDefaults.reportsDirectory,
			),
			reporter: this.resolveReporters(
				config.reporter || coverageConfigDefaults.reporter,
			),
		};

		this.instrumenter = createInstrumenter({
			produceSourceMap: true,
			autoWrap: false,
			esModules: true,
			compact: false,
			coverageVariable: coverageStorageKey,
			// @ts-expect-error missing type
			coverageGlobalScope: 'globalThis',
			coverageGlobalScopeFunc: false,
			ignoreClassMethods: this.options.ignoreClassMethods,
		});

		this.testExclude = new _TestExclude({
			cwd: ctx.config.root,
			include:
				typeof this.options.include === 'undefined'
					? undefined
					: [...this.options.include],
			exclude: [...defaultExclude, ...defaultInclude, ...this.options.exclude],
			excludeNodeModules: true,
			extension: this.options.extension,
		});
	}

	resolveOptions() {
		return this.options;
	}

	onFileTransform(sourceCode: string, id: string, pluginCtx: any) {
		if (!this.testExclude.shouldInstrument(id)) {
			return;
		}

		const sourceMap = pluginCtx.getCombinedSourcemap();
		sourceMap.sources = sourceMap.sources.map(removeQueryParameters);

		const code = this.instrumenter.instrumentSync(
			sourceCode,
			id,
			sourceMap,
		);
		const map = this.instrumenter.lastSourceMap() as any;

		return {code, map};
	}

	onAfterSuiteRun({coverage}: AfterSuiteRunMeta) {
		this.coverages.push(coverage);
	}

	async clean(clean = true) {
		if (clean && existsSync(this.options.reportsDirectory)) {
			await fs.rm(this.options.reportsDirectory, {
				recursive: true,
				force: true,
				maxRetries: 10,
			});
		}

		this.coverages = [];
	}

	async reportCoverage({allTestsRun}: ReportContext = {}) {
		const mergedCoverage: CoverageMap = this.coverages.reduce(
			(coverage, previousCoverageMap) => {
				const map = libCoverage.createCoverageMap(coverage);
				map.merge(previousCoverageMap);
				return map;
			},
			libCoverage.createCoverageMap({}),
		);

		if (this.options.all && allTestsRun) {
			await this.includeUntestedFiles(mergedCoverage);
		}

		includeImplicitElseBranches(mergedCoverage);

		const sourceMapStore = libSourceMaps.createSourceMapStore();
		const coverageMap: CoverageMap = await sourceMapStore.transformCoverage(
			mergedCoverage,
		);

		const context = libReport.createContext({
			dir: this.options.reportsDirectory,
			coverageMap,
			sourceFinder: sourceMapStore.sourceFinder,
			watermarks: this.options.watermarks,
		});

		for (const reporter of this.options.reporter) {
			if ((reporter[0] as string) === 'github') {
				new GithubIstanbulCoverageReporter({
					github,
					octokit,
					...reporter[1],
				}).execute(context);
				continue;
			}

			if ((reporter[0] as string) === 'github-summary') {
				new GithubSummaryIstanbulCoverageReporter({
					github,
					octokit,
					...reporter[1],
				}).execute(context);
				continue;
			}

			reports
				.create(reporter[0], {
					skipFull: this.options.skipFull,
					projectRoot: this.ctx.config.root,
					...reporter[1],
				})
				.execute(context);
		}

		if (
			this.options.branches
			?? this.options.functions
			?? this.options.lines
			?? this.options.statements
		) {
			this.checkThresholds(coverageMap, {
				branches: this.options.branches,
				functions: this.options.functions,
				lines: this.options.lines,
				statements: this.options.statements,
			});
		}

		if (this.options.thresholdAutoUpdate && allTestsRun) {
			this.updateThresholds({
				coverageMap,
				thresholds: {
					branches: this.options.branches,
					functions: this.options.functions,
					lines: this.options.lines,
					statements: this.options.statements,
				},
				perFile: this.options.perFile,
				configurationFile: this.ctx.server.config.configFile,
			});
		}
	}

	checkThresholds(
		coverageMap: CoverageMap,
		thresholds: Record<Threshold, number | undefined>,
	) {
		// Construct list of coverage summaries where thresholds are compared against
		const summaries = this.options.perFile
			? coverageMap.files().map((file: string) => ({
				file,
				summary: coverageMap.fileCoverageFor(file).toSummary(),
			}))
			: [
				{
					file: null,
					summary: coverageMap.getCoverageSummary(),
				},
			];

		// Check thresholds of each summary
		for (const {summary, file} of summaries) {
			for (const thresholdKey of [
				'lines',
				'functions',
				'statements',
				'branches',
			] as const) {
				const threshold = thresholds[thresholdKey];

				if (threshold !== undefined) {
					const coverage = summary.data[thresholdKey].pct;

					if (coverage < threshold) {
						process.exitCode = 1;

						/*
						 * Generate error message based on perFile flag:
						 * - ERROR: Coverage for statements (33.33%) does not meet threshold (85%) for src/math.ts
						 * - ERROR: Coverage for statements (50%) does not meet global threshold (85%)
						 */
						let errorMessage = `ERROR: Coverage for ${thresholdKey} (${coverage}%) does not meet`;

						if (!this.options.perFile) {
							errorMessage += ' global';
						}

						errorMessage += ` threshold (${threshold}%)`;

						if (this.options.perFile && file) {
							errorMessage += ` for ${relative('./', file).replace(
								/\\/g,
								'/',
							)}`;
						}

						console.error(errorMessage);
					}
				}
			}
		}
	}

	async includeUntestedFiles(coverageMap: CoverageMap) {
		// Load, instrument and collect empty coverages from all files which
		// are not already in the coverage map
		const includedFiles = await this.testExclude.glob(this.ctx.config.root);
		const uncoveredFiles = includedFiles
			.map(file => resolve(this.ctx.config.root, file))
			.filter(file => !coverageMap.data[file]);

		const transformResults = await Promise.all(
			uncoveredFiles.map(async filename => {
				const transformResult = await this.ctx.vitenode.transformRequest(
					filename,
				);
				return {transformResult, filename};
			}),
		);

		for (const {transformResult, filename} of transformResults) {
			const sourceMap = transformResult?.map;

			if (sourceMap) {
				this.instrumenter.instrumentSync(
					transformResult.code,
					filename,
					sourceMap,
				);

				const lastCoverage = this.instrumenter.lastFileCoverage();
				if (lastCoverage) {
					coverageMap.addFileCoverage(lastCoverage);
				}
			}
		}
	}
}

/**
 * Remove possible query parameters from filenames
 * - From `/src/components/Header.component.ts?vue&type=script&src=true&lang.ts`
 * - To `/src/components/Header.component.ts`
 */
function removeQueryParameters(filename: string) {
	return filename.split('?')[0];
}

function isEmptyCoverageRange(range: libCoverage.Range) {
	return (
		range.start === undefined
		|| range.start.line === undefined
		|| range.start.column === undefined
		|| range.end === undefined
		|| range.end.line === undefined
		|| range.end.column === undefined
	);
}

function includeImplicitElseBranches(coverageMap: CoverageMap) {
	for (const file of coverageMap.files()) {
		const fileCoverage = coverageMap.fileCoverageFor(file);

		for (const branchMap of Object.values(fileCoverage.branchMap)) {
			if (branchMap.type !== 'if') {
				continue;
			}

			const lastIndex = branchMap.locations.length - 1;

			if (lastIndex > 0) {
				const elseLocation = branchMap.locations[lastIndex];

				if (elseLocation && isEmptyCoverageRange(elseLocation)) {
					const ifLocation = branchMap.locations[0];

					elseLocation.start = {...ifLocation.start};
					elseLocation.end = {...ifLocation.end};
				}
			}
		}
	}
}

export default githubIstanbulCoverageProviderModule;
