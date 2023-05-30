import {defineConfig} from 'vitest/config';
import {GithubReporter} from './src';
// Import { GithubReporter } from './dist/index.mjs';

export default defineConfig({
	test: {
		coverage: {
			provider: 'custom',
			customProviderModule: 'src/coverage/GithubIstanbulCoverageProviderModule',
			// @ts-expect-error github and github-summary are not default reporters
			reporter: ['github', 'github-summary'],
			lines: 80,
		},
	},
});
