import {beforeEach, describe, expect, test} from 'vitest';
import sum from './sum';

let val: number;

describe('Given sum() was called', () => {
	describe('When the arguments are 1 and 1', () => {
		beforeEach(() => {
			val = sum(1, 1);
		});

		// Passing test
		test('Then the sum should be 2', () => {
			expect(val).toBe(2);
		});

		// Failing test
		test('Then the sum should be 3', () => {
			expect(val).toBe(3);
		});
	});
});
