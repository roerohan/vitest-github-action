import {defineConfig} from 'tsup';

export default defineConfig([
	{
		entry: ['src/index.ts'],
		target: 'node14.16',
		format: ['cjs', 'esm'],
		dts: true,
		sourcemap: true,
		clean: true,
	},
	{
		entry: ['src/action.ts'],
		target: 'node14.16',
		noExternal: ['@actions/core', 'vitest/node'],
		external: ['@vitest/ui', '@vitest/browser'],
		format: ['esm'],
		dts: true,
		sourcemap: true,
		clean: true,
	},
]);
