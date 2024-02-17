import libReport from 'istanbul-lib-report';
import type github from '@actions/github';
import {getAttributeRow, getStatus} from './helper';
import {summary} from '@actions/core';

export type Octokit = ReturnType<typeof github.getOctokit>;
export type Github = typeof github;

const htmlTableStart = `
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

const htmlFilesTableStart = `
<table>
  <thead>
    <tr>
     <th align="center">File</th>
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

type CoverageSummary = ReturnType<libReport.ReportNode['getCoverageSummary']>;

class GithubSummaryIstanbulCoverageReporter extends libReport.ReportBase {
	octokit: Octokit;

	github: Github;

	report: string;

	filesReport: string;

	constructor(options: {github: Github; octokit: Octokit}) {
		super();
		this.octokit = options.octokit;
		this.github = options.github;
		this.report = '';
		this.filesReport = '';
	}

	onStart() {
		this.report += htmlTableStart;
		this.filesReport += htmlFilesTableStart;
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

	writeFileSummary(filePath: string, sc: CoverageSummary) {
		this.filesReport += '<tr>\n';
		this.filesReport += `<td alight="center">${filePath}</td>`;
		this.filesReport += getAttributeRow(sc.lines);
		this.filesReport += getAttributeRow(sc.statements);
		this.filesReport += getAttributeRow(sc.functions);
		this.filesReport += getAttributeRow(sc.branches);
		this.filesReport += '</tr>\n';
	}

	onSummary(node: libReport.ReportNode) {
		if (!node.isRoot()) {
			return;
		}

		this.writeSummary(node.getCoverageSummary(false));
	}

	onDetail(node: libReport.ReportNode) {
		this.writeFileSummary(
			node.getFileCoverage().path,
			node.getCoverageSummary(false),
		);
	}

	async onEnd() {
		this.report += htmlTableEnd;
		this.filesReport += htmlTableEnd;

		const reportSummary = summary
			.addHeading('Coverage Summary')
			.addRaw(this.report)
			.stringify();

		await summary.clear();
		const filesReportSummary = summary
			.addHeading('Coverage Summary for all Files')
			.addDetails('Click to expand', this.filesReport)
			.stringify();

		const prNumber = this.github.context.payload.pull_request?.number;

		if (prNumber) {
			// NOTE(roerohan): Report total summary
			await this.octokit.rest.issues.createComment({
				owner: this.github.context.repo.owner,
				repo: this.github.context.repo.repo,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				issue_number: prNumber,
				body: reportSummary,
			});

			// NOTE(roerohan): Report filewise summary
			await this.octokit.rest.issues.createComment({
				owner: this.github.context.repo.owner,
				repo: this.github.context.repo.repo,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				issue_number: prNumber,
				body: filesReportSummary,
			});
		}
	}
}

export default GithubSummaryIstanbulCoverageReporter;
