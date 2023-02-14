import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['cjs', 'es'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['vitest'],
        },
    },
});
