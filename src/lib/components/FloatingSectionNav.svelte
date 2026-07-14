<script lang="ts">
	import type { SectionId } from '$lib/isec-data';

	type NavigateToSection = (sectionId: SectionId, event: MouseEvent) => void;

	let {
		navigateToSection,
		showFloatingNav
	}: {
		navigateToSection: NavigateToSection;
		showFloatingNav: boolean;
	} = $props();
</script>

<nav class:is-visible={showFloatingNav} class="floating-section-nav" aria-label="Page sections">
	<a href="/services" onclick={(event) => navigateToSection('services', event)}>Features</a>
	<a href="/quote" onclick={(event) => navigateToSection('quote', event)}>Plans</a>
	<a href="/quote" onclick={(event) => navigateToSection('quote', event)}>Pricing</a>
	<a href="/cover" onclick={(event) => navigateToSection('cover', event)}>What's covered</a>
	<a href="/partners" onclick={(event) => navigateToSection('partners', event)}>Partners</a>
	<a href="/support" onclick={(event) => navigateToSection('support', event)}>FAQs</a>
	<a class="back-top" href="/" onclick={(event) => navigateToSection('top', event)}>Back to top</a>
</nav>
