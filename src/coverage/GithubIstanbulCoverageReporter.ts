import {ReportBase, type Context} from 'istanbul-lib-report';

class GithubIstanbulCoverageReporter extends ReportBase {
	file: string;

	first: boolean;

	contentWriter: any;

	constructor(options?: {file?: string}) {
		super();

		this.file = options?.file ?? 'coverage-github.json';
		this.first = true;
	}

	onStart(root: any, context: Context) {
		this.contentWriter = context.writer.writeFile(this.file);
		this.contentWriter.write('{');
	}

	onDetail(node: any) {
		const fc = node.getFileCoverage();
		const key = fc.path;
		const cw = this.contentWriter;

		if (this.first) {
			this.first = false;
		} else {
			cw.write(',');
		}

		cw.write(JSON.stringify(key));
		cw.write(': ');
		cw.write(JSON.stringify(fc));
		cw.println('');
	}

	onEnd() {
		const cw = this.contentWriter;
		cw.println('}');
		cw.close();
	}
}

export default GithubIstanbulCoverageReporter;
