import {getInput} from '@actions/core';
import {startVitest} from 'vitest/node';
import GithubReporter from './GithubReporter';

async function main(): Promise<void> {
	const configFile: string = getInput('config');
	const coverage = Boolean(getInput('coverage') ?? true);

	const vitest = await startVitest('test', [], {
		watch: false,
		config: configFile,
	}, {
		test: {
			reporters: [new GithubReporter(), 'default'],
			coverage: {
				enabled: coverage,
				provider: 'custom',
				customProviderModule: 'github-istanbul-coverage-provider',
			},
		},
	});

	await vitest?.close();
}

void main();

