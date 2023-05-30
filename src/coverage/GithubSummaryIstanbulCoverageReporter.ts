import {type Context, ReportBase, type ReportNode} from 'istanbul-lib-report';
import type {Github, Octokit} from './GithubIstanbulCoverageProviderModule';

const htmlTableStart = `
<h2>Coverage Summary</h2>
<table>
  <thead>
    <tr>
     <th align="center">Lines</th>
     <th align="center">Statements</th>
     <th align="center">Functions</th>
     <th align="center">Branches</th>
    </tr>
  </thead>
  <tbody>
`;

const htmlTableEnd = `
  </tbody>
</table>
`;

type CoverageSummary = ReturnType<ReportNode['getCoverageSummary']>;

class GithubSummaryIstanbulCoverageReporter extends ReportBase {
	file: string;

	first: boolean;

	contentWriter: any;

	octokit: Octokit;

	github: Github;

	report: string;

	constructor(options: {file?: string; github: Github; octokit: Octokit}) {
		super();

		this.file = options?.file ?? 'coverage-github-summary.json';
		this.first = true;

		this.octokit = options.octokit;
		this.github = options.github;
		this.report = '';
	}

	onStart() {
		this.report += htmlTableStart;
	}

	writeSummary(sc: CoverageSummary) {
		const getAttributeRow = (attribute: {
			pct: number;
			covered: number;
			total: number;
		}) =>
			`<td>${attribute.pct} (${attribute.covered} / ${attribute.total})</td>\n`;

		this.report += '<tr>\n';
		this.report += getAttributeRow(sc.lines);
		this.report += getAttributeRow(sc.statements);
		this.report += getAttributeRow(sc.functions);
		this.report += getAttributeRow(sc.branches);
		this.report += '</tr>\n';
	}

	onSummary(node: ReportNode) {
		if (!node.isRoot()) {
			return;
		}

		this.writeSummary(node.getCoverageSummary(false));
	}

	// OnDetail(node: any) {
	//   this.writeSummary(node.getFileCoverage().path, node.getCoverageSummary());
	// }

	async onEnd() {
		this.report += htmlTableEnd;

		if (this.github.context.payload.pull_request?.number) {
			await this.octokit.rest.issues.createComment({
				owner: this.github.context.repo.owner,
				repo: this.github.context.repo.repo,
				issue_number: this.github.context.payload.pull_request.number,
				body: this.report,
			});
		}
	}
}

export default GithubSummaryIstanbulCoverageReporter;
