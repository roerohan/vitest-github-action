import {defineConfig} from 'tsup';

export default defineConfig({
	entry: ['src/index.ts', 'src/action.ts'],
	target: 'node14.16',
	format: ['cjs', 'esm'],
	dts: true,
	sourcemap: true,
	clean: true,
});
