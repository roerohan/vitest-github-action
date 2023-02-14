import {beforeEach, describe, expect, test, vi} from 'vitest';

let sum: () => void;

describe('Given sum() exists', () => {
	beforeEach(() => {
		sum = vi.fn();
	});

	describe('When sum() is called', () => {
		beforeEach(() => {
			sum();
		});

		test('sum() should be called', () => {
			expect(sum).toBeCalled();
		});

		test('sum() should not be called', () => {
			expect(sum).not.toBeCalled();
		});
	});
});
