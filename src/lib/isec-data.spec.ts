import { describe, expect, it } from 'vitest';
import {
	coverages,
	faqs,
	metrics,
	partners,
	products,
	supportFeatures,
	testimonials
} from './isec-data';

function expectNonEmptyString(value: string) {
	expect(typeof value).toBe('string');
	expect(value.trim().length).toBeGreaterThan(0);
}

describe('isec data integrity', () => {
	it('keeps core collections populated', () => {
		expect(coverages.length).toBeGreaterThan(0);
		expect(products.length).toBeGreaterThan(0);
		expect(supportFeatures.length).toBeGreaterThan(0);
		expect(metrics.length).toBeGreaterThan(0);
		expect(partners.length).toBeGreaterThan(0);
		expect(testimonials.length).toBeGreaterThan(0);
		expect(faqs.length).toBeGreaterThan(0);
	});

	it('defines complete coverage cards', () => {
		for (const coverage of coverages) {
			expectNonEmptyString(coverage.title);
			expectNonEmptyString(coverage.description);
			expectNonEmptyString(coverage.icon);
			expectNonEmptyString(coverage.previewTitle);
			expectNonEmptyString(coverage.previewImage);
		}
	});

	it('defines complete product cards', () => {
		for (const product of products) {
			expectNonEmptyString(product.title);
			expectNonEmptyString(product.body);
			expectNonEmptyString(product.image);
		}
	});

	it('defines complete support features', () => {
		for (const feature of supportFeatures) {
			expectNonEmptyString(feature.title);
			expectNonEmptyString(feature.body);
			expectNonEmptyString(feature.image);
		}
	});

	it('defines complete metrics with optional images', () => {
		for (const metric of metrics) {
			expectNonEmptyString(metric.value);
			expectNonEmptyString(metric.label);
			expectNonEmptyString(metric.body);
			expect(['photo', 'orange', 'blue', 'gold']).toContain(metric.tone);
			if (metric.image) {
				expectNonEmptyString(metric.image);
			} else {
				expect(metric.image).toBeUndefined();
			}
		}
	});

	it('keeps partner names unique for marquee keys', () => {
		const partnerNames = partners.map((partner) => partner.name);
		expect(new Set(partnerNames).size).toBe(partnerNames.length);
	});

	it('defines complete testimonials and faqs', () => {
		for (const testimonial of testimonials) {
			expectNonEmptyString(testimonial.title);
			expectNonEmptyString(testimonial.body);
			expect(['rose', 'cream', 'mint', 'white']).toContain(testimonial.tone);
		}

		for (const faq of faqs) {
			expectNonEmptyString(faq.question);
			expectNonEmptyString(faq.answer);
		}
	});
});


