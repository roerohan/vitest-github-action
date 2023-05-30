import {type Context, ReportBase, type ReportNode} from 'istanbul-lib-report';
import type {Github, Octokit} from './GithubIstanbulCoverageProviderModule';
import { getAttributeRow, getStatus } from './helper';

const htmlTableStart = `
<h2>Coverage Summary</h2>
<table>
  <thead>
    <tr>
     <th align="center">Status</th>
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
	contentWriter: any;

	octokit: Octokit;

	github: Github;

	report: string;

	constructor(options: {github: Github; octokit: Octokit}) {
		super();
		this.octokit = options.octokit;
		this.github = options.github;
		this.report = '';
	}

	onStart() {
		this.report += htmlTableStart;
	}

	writeSummary(sc: CoverageSummary) {
		this.report += '<tr>\n';
		this.report += getStatus(sc.lines);
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

	// NOTE(roerohan): Use this method to get file coverage summary
	// onDetail(node: any) {
	//   this.writeSummary(node.getFileCoverage().path, node.getCoverageSummary());
	// }

	async onEnd() {
		this.report += htmlTableEnd;
	
		const prNumber = this.github.context.payload.pull_request?.number;
		if (prNumber) {
			await this.octokit.rest.issues.createComment({
				owner: this.github.context.repo.owner,
				repo: this.github.context.repo.repo,
				issue_number: prNumber,
				body: this.report,
			});
		}
	}
}

export default GithubSummaryIstanbulCoverageReporter;
