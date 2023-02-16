import * as core from '@actions/core';

async function main(): Promise<void> {
	const configFile: string = core.getInput('config');
	console.log(configFile);
}

void main();
