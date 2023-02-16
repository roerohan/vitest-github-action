import * as core from '@actions/core';
import { exec } from 'child_process';
import { readFile } from 'fs/promises';
import type { UserConfig } from 'vitest';

async function main(): Promise<void> {
	const configFile: string = core.getInput('config');
	console.log(configFile);

	const config: UserConfig = await readFile(configFile);
	console.log(config);
}

void main();
