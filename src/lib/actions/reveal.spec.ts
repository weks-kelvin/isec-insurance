import { afterEach, describe, expect, it, vi } from 'vitest';
import { reveal } from './reveal';

type ObserverCallback = ConstructorParameters<typeof IntersectionObserver>[0];

let activeCallback: ObserverCallback | undefined;
const observe = vi.fn();
const disconnect = vi.fn();

class MockIntersectionObserver {
	constructor(callback: ObserverCallback) {
		activeCallback = callback;
	}

	observe = observe;
	disconnect = disconnect;
	unobserve = vi.fn();
	takeRecords = vi.fn(() => []);
	root = null;
	rootMargin = '';
	thresholds = [];
}

describe('reveal action', () => {
	afterEach(() => {
		activeCallback = undefined;
		observe.mockClear();
		disconnect.mockClear();
		vi.unstubAllGlobals();
	});

	it('reveals and disconnects when the element enters the viewport', () => {
		expect.assertions(3);
		vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
		const classes = new Set<string>();
		const node = {
			classList: {
				add: (className: string) => classes.add(className),
				contains: (className: string) => classes.has(className)
			}
		} as unknown as HTMLElement;

		reveal(node);
		activeCallback?.(
			[{ isIntersecting: true } as IntersectionObserverEntry],
			{} as IntersectionObserver
		);

		expect(observe).toHaveBeenCalledWith(node);
		expect(classes.has('is-revealed')).toBe(true);
		expect(disconnect).toHaveBeenCalledOnce();
	});

	it('disconnects when destroyed before reveal', () => {
		expect.assertions(1);
		vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
		const node = { classList: { add: vi.fn() } } as unknown as HTMLElement;

		reveal(node).destroy();

		expect(disconnect).toHaveBeenCalledOnce();
	});
});
