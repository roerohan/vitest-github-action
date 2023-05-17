import {getInput} from '@actions/core';
import {startVitest} from 'vitest/node';
import {$} from 'execa';
import GithubReporter from './GithubReporter';

async function main(): Promise<void> {
	const configFile: string = getInput('config');
	const actionsReporterPath = '/tmp/reporter.ts';
	// Const coverage = Boolean(getInput('coverage'));

	console.log(await $`pwd`, await $`ls`, await $`ls ..`);
	// 	Const vitest = await startVitest('test', [], {
	// 		watch: false,
	// 		config: configFile,
	// 	}, {
	// 		test: {
	// 			reporters: [new GithubReporter(), 'default'],
	// 		},
	// 	});
	//
	// 	await vitest?.close();
	console.log(await $`echo $GITHUB_WORKSPACE`, await $`ls /github/workspace`, await $`ls /`);
	console.log(await $`npx vitest`);
}

void main();

export default GithubReporter;
