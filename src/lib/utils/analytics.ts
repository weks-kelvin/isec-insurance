type AnalyticsEvent = Readonly<{
	name: string;
	properties?: Record<string, string | number | boolean>;
}>;

declare global {
	interface Window {
		dataLayer?: AnalyticsEvent[];
	}
}

export function trackEvent(name: string, properties?: AnalyticsEvent['properties']) {
	if (typeof window === 'undefined') return;
	window.dataLayer = window.dataLayer ?? [];
	window.dataLayer.push({ name, properties });
}
