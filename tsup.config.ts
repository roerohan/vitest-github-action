import {defineConfig} from 'tsup';

export default defineConfig([
	{
		entry: ['src/index.ts'],
		target: 'node14.16',
		format: ['cjs', 'esm'],
		dts: true,
		clean: true,
	},
	{
		entry: ['src/action.ts'],
		target: 'node18',
		format: ['esm'],
		dts: true,
		clean: true,
	},
]);
