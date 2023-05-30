import {ReportBase, type Context} from 'istanbul-lib-report';
import type {Github, Octokit} from './GithubIstanbulCoverageProviderModule';

class GithubIstanbulCoverageReporter extends ReportBase {
	octokit: Octokit;

	github: Github;

	constructor(options: {file?: string; github: Github; octokit: Octokit}) {
		super();
		this.octokit = options.octokit;
		this.github = options.github;
	}
	//
	// onStart(root: any, context: Context) {
	// 	this.contentWriter = context.writer.writeFile(this.file);
	// 	this.contentWriter.write('{');
	// }
	//
	// onDetail(node: any) {
	// 	const fc = node.getFileCoverage();
	// 	const key = fc.path;
	// 	const cw = this.contentWriter;
	//
	// 	if (this.first) {
	// 		this.first = false;
	// 	} else {
	// 		cw.write(',');
	// 	}
	//
	// 	cw.write(JSON.stringify(key));
	// 	cw.write(': ');
	// 	cw.write(JSON.stringify(fc));
	// 	cw.println('');
	// }
	//
	// onEnd() {
	// 	const cw = this.contentWriter;
	// 	cw.println('}');
	// 	cw.close();
	// }
}

export default GithubIstanbulCoverageReporter;
