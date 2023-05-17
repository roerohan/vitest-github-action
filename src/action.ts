import {getInput} from '@actions/core';
import {startVitest} from 'vitest/node';
import {$} from 'execa';
import GithubReporter from './GithubReporter';

async function main(): Promise<void> {
	const configFile: string = getInput('config');
	// Const coverage = Boolean(getInput('coverage'));

	await $`npm install vitest-github-action`;
	await $`npx vitest --reporter ./node_modules/vitest-github-action/dist/index.js`;

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
}

void main();

export default GithubReporter;
