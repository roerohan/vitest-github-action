import { defineConfig } from 'tsup';

export default defineConfig([
	{
		entry: ['src/index.ts'],
		target: 'node14.16',
		format: ['esm'],
		dts: true,
		clean: true,
	},
	{
		entry: ['src/action.ts'],
		target: 'node18',
		format: ['esm'],
		dts: true,
		clean: true,
		noExternal: ['@actions/core', 'vitest'],
		external: ['lightningcss', '@vitest/ui', '@vitest/browser', '@edge-runtime/vm', 'happy-dom', 'jsdom'],
		splitting: false,
	},
	{
		entry: ['src/github-istanbul-coverage-provider.ts'],
		target: 'node18',
		format: ['esm'],
		dts: false,
		clean: true,
	},
]);
