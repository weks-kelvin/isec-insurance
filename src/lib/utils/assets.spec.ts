import { describe, expect, it } from 'vitest';
import { imageUrl } from './assets';

describe('imageUrl', () => {
	it('builds URLs under the theme image directory', () => {
		expect.assertions(1);
		expect(imageUrl('hero.png')).toBe('/theme/assets/images/hero.png');
	});

	it('preserves spaces and special characters in filenames', () => {
		expect.assertions(1);
		expect(imageUrl('Screenshot 2026-04-27 at 21.35.44 1.svg')).toBe(
			'/theme/assets/images/Screenshot 2026-04-27 at 21.35.44 1.svg'
		);
	});
});

