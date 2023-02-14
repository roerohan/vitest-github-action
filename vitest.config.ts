import { defineConfig } from 'vitest/config';
import { GithubReporter } from './src';

export default defineConfig({
    test: {
        reporters: ['default', new GithubReporter()],
    },
});
