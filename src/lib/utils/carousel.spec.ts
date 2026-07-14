import { describe, expect, it } from 'vitest';
import { boundedIndex, nextIndex, previousIndex } from './carousel';

describe('carousel index helpers', () => {
	it('wraps forward from the last item', () => {
		expect.assertions(1);
		expect(nextIndex(4, 5)).toBe(0);
	});

	it('wraps backward from the first item', () => {
		expect.assertions(1);
		expect(previousIndex(0, 5)).toBe(4);
	});

	it('guards empty carousels', () => {
		expect.assertions(3);
		expect(nextIndex(0, 0)).toBe(0);
		expect(previousIndex(0, 0)).toBe(0);
		expect(boundedIndex(12, 0)).toBe(0);
	});

	it('bounds direct selection', () => {
		expect.assertions(2);
		expect(boundedIndex(-3, 5)).toBe(0);
		expect(boundedIndex(9, 5)).toBe(4);
	});
});
