import { defineConfig } from 'vitest/config';
import { GithubReporter } from './src';
// import { GithubReporter } from './dist/index.mjs';

export default defineConfig({
    test: {
        reporters: ['default', new GithubReporter()],
    },
});
