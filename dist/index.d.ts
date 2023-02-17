import { Reporter, Vitest, File, Task, Test } from 'vitest';
import { AnnotationProperties } from '@actions/core';

type TokenLocation = {
    file: string;
    line: number;
    col: number;
};
type FormattedError = {
    annotation: AnnotationProperties;
    stack: string;
};
declare class GithubReporter implements Reporter {
    ctx: Vitest;
    onInit(ctx: Vitest): void;
    onFinished(files?: File[], _errors?: unknown[]): void;
    identifyTests(tasks: Task[], tests?: Test[]): Test[];
    getFullNameOfTest(test: Task, name?: string): string;
    getAllErrors(tests: Test[]): (Error & {
        file: Test['file'];
        testName: string;
    })[];
    getErrorLocation(stackTrace: string, fileName: string): TokenLocation | undefined;
    getFormattedErrors(failedTests: Test[]): FormattedError[];
    removeAnsiColors(str: string): string;
}

export { GithubReporter, GithubReporter as default };
