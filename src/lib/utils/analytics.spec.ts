import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackEvent } from './analytics';

describe('trackEvent', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('is a no-op during SSR when window is unavailable', () => {
		expect.assertions(1);
		expect(() => trackEvent('server_event')).not.toThrow();
	});

	it('initializes window.dataLayer when missing', () => {
		expect.assertions(2);
		const mockWindow = {} as Window;
		vi.stubGlobal('window', mockWindow);

		trackEvent('cta_click', { location: 'hero' });

		expect(window.dataLayer).toBeDefined();
		expect(window.dataLayer).toEqual([{ name: 'cta_click', properties: { location: 'hero' } }]);
	});

	it('appends events to existing dataLayer entries', () => {
		expect.assertions(1);
		const mockWindow = {
			dataLayer: [{ name: 'existing_event' }]
		} as Window;
		vi.stubGlobal('window', mockWindow);

		trackEvent('carousel_next', { activeProductIndex: 2, autoplay: true });

		expect(window.dataLayer).toEqual([
			{ name: 'existing_event' },
			{ name: 'carousel_next', properties: { activeProductIndex: 2, autoplay: true } }
		]);
	});
});

