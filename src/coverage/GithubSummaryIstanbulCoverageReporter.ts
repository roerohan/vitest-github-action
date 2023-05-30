import {type Context, ReportBase} from 'istanbul-lib-report';
import type {Github, Octokit} from './GithubIstanbulCoverageProviderModule';

class GithubSummaryIstanbulCoverageReporter extends ReportBase {
	file: string;

	first: boolean;

	contentWriter: any;

	octokit: Octokit;

	github: Github;

	constructor(options: {file?: string; github: Github; octokit: Octokit}) {
		super();

		this.file = options?.file ?? 'coverage-github-summary.json';
		this.first = true;

		this.octokit = options.octokit;
		this.github = options.github;
	}

	onStart(root: any, context: Context) {
		this.contentWriter = context.writer.writeFile(this.file);
		this.contentWriter.write('{');
	}

	writeSummary(filePath: string, sc: Record<string, unknown>) {
		const cw = this.contentWriter;
		if (this.first) {
			this.first = false;
		} else {
			cw.write(',');
		}

		cw.write(JSON.stringify(filePath));
		cw.write(': ');
		cw.write(JSON.stringify(sc));
		cw.println('');
	}

	onSummary(node: any) {
		if (!node.isRoot()) {
			return;
		}

		this.writeSummary('total', node.getCoverageSummary());
	}

	onDetail(node: any) {
		this.writeSummary(node.getFileCoverage().path, node.getCoverageSummary());
	}

	async onEnd() {
		const cw = this.contentWriter;
		cw.println('}');
		cw.close();

		if (this.github.context.payload.pull_request?.number) {
			await this.octokit.rest.issues.createComment({
				owner: this.github.context.repo.owner,
				repo: this.github.context.repo.repo,
				issue_number: this.github.context.payload.pull_request.number,
				body: 'comment from vitest-github-action',
			});
		}
	}
}

export default GithubSummaryIstanbulCoverageReporter;
