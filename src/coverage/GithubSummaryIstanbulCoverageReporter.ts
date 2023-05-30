import {type Context, ReportBase} from 'istanbul-lib-report';

class GithubSummaryIstanbulCoverageReporter extends ReportBase {
	file: string;

	first: boolean;

	contentWriter: any;

	constructor(options?: {file?: string}) {
		super();

		this.file = options?.file ?? 'coverage-github-summary.json';
		this.first = true;
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

	onEnd() {
		const cw = this.contentWriter;
		cw.println('}');
		cw.close();
	}
}

export default GithubSummaryIstanbulCoverageReporter;
