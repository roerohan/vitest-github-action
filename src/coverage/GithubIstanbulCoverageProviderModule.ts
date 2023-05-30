import type {
	BaseCoverageOptions,
	CoverageProviderModule,
	ReportContext,
	ResolvedCoverageOptions,
} from 'vitest';
import type {CoverageProvider} from 'vitest';

import {IstanbulCoverageProvider} from '@vitest/coverage-istanbul/dist/provider';
import {type CoverageMap} from 'istanbul-lib-coverage';
import libCoverage from 'istanbul-lib-coverage';
import libSourceMaps from 'istanbul-lib-source-maps';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';
import GithubIstanbulCoverageReporter from './GithubIstanbulCoverageReporter';
import GithubSummaryIstanbulCoverageReporter from './GithubSummaryIstanbulCoverageReporter';

const GithubIstanbulCoverageProviderModule: CoverageProviderModule = {
	getProvider(): CoverageProvider {
		return new GithubIstanbulCoverageProvider();
	},

	// Implements rest of the CoverageProviderModule ...
};

type Options = ResolvedCoverageOptions<'istanbul'>;

export class GithubIstanbulCoverageProvider extends IstanbulCoverageProvider {
	name = 'github-istanbul';

	declare options: Options;

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
			if (reporter[0] === 'github') {
				new GithubIstanbulCoverageReporter(reporter[1]).execute(context);
				continue;
			}

			if (reporter[0] === 'github-summary') {
				new GithubSummaryIstanbulCoverageReporter(reporter[1]).execute(context);
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
      || this.options.functions
      || this.options.lines
      || this.options.statements
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
			if (branchMap.type === 'if') {
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
}

export default GithubIstanbulCoverageProviderModule;
