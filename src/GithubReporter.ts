import type {Reporter, Vitest, File, Test, Task} from 'vitest';
import {endGroup, startGroup, error as actionsError, type AnnotationProperties} from '@actions/core';

type TokenLocation = {
	file: string;
	line: number;
	col: number;
};

type FormattedError = {annotation: AnnotationProperties; stack: string};

export default class GithubReporter implements Reporter {
	ctx!: Vitest;

	onInit(ctx: Vitest): void {
		this.ctx = ctx;
	}

	onFinished(files?: File[], _errors?: unknown[]) {
		if (!files?.length) {
			return;
		}

		startGroup('Vitest annotations:');

		const tests = this.identifyTests(files);
		const failedTests = tests.filter(({result}) => result?.state === 'fail');
		const formattedErrors = this.getFormattedErrors(failedTests);

		formattedErrors.forEach(error => {
			actionsError(
				error.stack ? `Stack trace: \n\n${error.stack}` : 'Vitest Error',
				error.annotation,
			);
		});

		console.log('Formatted Errors', formattedErrors);

		endGroup();
	}

	identifyTests(tasks: Task[], tests: Test[] = []): Test[] {
		tasks.forEach(task => {
			if (task.type === 'suite') {
				this.identifyTests(task.tasks, tests);
			} else if (task.type === 'test') {
				tests.push(task);
			}
		});

		return tests;
	}

	getFullNameOfTest(test: Task, name = ''): string {
		if (!test.suite) {
			return '';
		}

		name = test.name;
		const suiteName = this.getFullNameOfTest(test.suite, name);
		return `${suiteName ? `${suiteName} > ` : ''}${name}`;
	}

	getAllErrors(tests: Test[]) {
		let errors: Array<Error & {file: Test['file']; testName: string}> = [];

		tests.forEach(test => {
			const errs = test.result?.errors?.map(error => ({
				...error,
				file: test.file,
				testName: this.getFullNameOfTest(test),
			}));

			if (errs?.length) {
				errors = errors.concat(errs);
			}
		});
		return errors;
	}

	getErrorLocation(stackTrace: string, fileName: string): TokenLocation | undefined {
		const errorLine = stackTrace.split('\n').find(stackTraceLine => stackTraceLine.includes(fileName)) ?? '';
		const bracketRegex = /\((.*):(\d+):(\d+)\)$/;
		const atRegex = /at (.*):(\d+):(\d+)$/;
		let match;
		match = bracketRegex.exec(errorLine);
		if (!match) {
			match = atRegex.exec(errorLine);
		}

		if (match && match.length >= 3) {
			return {
				file: match[1],
				line: parseInt(match[2], 10),
				col: parseInt(match[3], 10),
			};
		}
	}

	getFormattedErrors(failedTests: Test[]): FormattedError[] {
		const errors = this.getAllErrors(failedTests);

		const formattedErrors: FormattedError[] = [];
		errors.forEach(error => {
			if (!error?.stack) {
				return;
			}

			error.stack = this.removeAnsiColors(error.stack);
			error.message = this.removeAnsiColors(error.message);
			error.name = this.removeAnsiColors(error.name);

			const {file, line, col} = this.getErrorLocation(error.stack, error.file?.name ?? '') ?? {};
			if (file && line && col) {
				const annotation: AnnotationProperties = {
					file,
					startLine: line,
					startColumn: col,
					title: `${error.name}: ${error.testName}`,
				};

				formattedErrors.push({
					annotation,
					stack: error.stack,
				});
			}
		});
		return formattedErrors;
	}

	removeAnsiColors(str: string): string {
		// Const colorRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
		const colorRegex = /^$/;
		return str.replace(colorRegex, '');
	}
}
