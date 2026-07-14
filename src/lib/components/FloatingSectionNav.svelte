<script lang="ts">
	import type { SectionId } from '$lib/isec-data';

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
</script>

<nav class:is-visible={showFloatingNav} class="floating-section-nav" aria-label="Page sections">
	<a href={sectionHref('services')} onclick={closeCoverageMenu}>Features</a>
	<a href={sectionHref('quote')} onclick={closeCoverageMenu}>Plans</a>
	<a href={sectionHref('quote')} onclick={closeCoverageMenu}>Pricing</a>
	<a href={sectionHref('cover')} onclick={closeCoverageMenu}>What's covered</a>
	<a href={sectionHref('partners')} onclick={closeCoverageMenu}>Partners</a>
	<a href={sectionHref('support')} onclick={closeCoverageMenu}>FAQs</a>
	<a class="back-top" href={sectionHref('top')} onclick={closeCoverageMenu}>Back to top</a>
</nav>
