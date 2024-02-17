import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			provider: 'custom',
			customProviderModule: 'src/coverage/GithubIstanbulCoverageProviderModule',
			// @ts-expect-error github and github-summary are not default reporters
			reporter: ['github', 'github-summary'],
		},
	},
});
