<script lang="ts">
	import type { SectionId } from '$lib/isec-data';
	import { trackEvent } from '$lib/utils/analytics';

	type SectionHref = (sectionId: SectionId) => string;

	let {
		closeCoverageMenu,
		sectionHref,
		showFloatingNav
	}: {
		closeCoverageMenu: () => void;
		sectionHref: SectionHref;
		showFloatingNav: boolean;
	} = $props();

	function handleSectionClick(sectionId: SectionId) {
		closeCoverageMenu();
		trackEvent('floating_nav_click', { sectionId });
	}
</script>

<nav class:is-visible={showFloatingNav} class="floating-section-nav" aria-label="Page sections">
	<a href={sectionHref('services')} onclick={() => handleSectionClick('services')}>Features</a>
	<a href={sectionHref('quote')} onclick={() => handleSectionClick('quote')}>Plans</a>
	<a href={sectionHref('quote')} onclick={() => handleSectionClick('quote')}>Pricing</a>
	<a href={sectionHref('cover')} onclick={() => handleSectionClick('cover')}>What's covered</a>
	<a href={sectionHref('partners')} onclick={() => handleSectionClick('partners')}>Partners</a>
	<a href={sectionHref('support')} onclick={() => handleSectionClick('support')}>FAQs</a>
	<a class="back-top" href={sectionHref('top')} onclick={() => handleSectionClick('top')}
		>Back to top</a
	>
</nav>
