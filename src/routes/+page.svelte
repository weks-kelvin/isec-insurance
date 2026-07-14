<script lang="ts">
	import { onMount } from 'svelte';
	import CoverageMenu from '$lib/components/CoverageMenu.svelte';
	import FaqSection from '$lib/components/FaqSection.svelte';
	import FloatingSectionNav from '$lib/components/FloatingSectionNav.svelte';
	import GrowthSection from '$lib/components/GrowthSection.svelte';
	import LandingHero from '$lib/components/LandingHero.svelte';
	import MetricGrid from '$lib/components/MetricGrid.svelte';
	import PartnerSection from '$lib/components/PartnerSection.svelte';
	import ProductCarousel from '$lib/components/ProductCarousel.svelte';
	import ProofSection from '$lib/components/ProofSection.svelte';
	import ServiceBand from '$lib/components/ServiceBand.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import { products, type SectionId } from '$lib/isec-data';

	let activeProductIndex = $state(1);
	let isCoverageMenuOpen = $state(false);
	let showFloatingNav = $state(false);
	let activeCoverageIndex = $state(0);
	let openFaqIndex = $state<number | null>(0);
	let scrollProgress = $state(0);
	let productTimer: ReturnType<typeof setInterval> | undefined;

	function sectionHref(sectionId: SectionId) {
		return sectionId === 'top' ? '#top' : `#${sectionId}`;
	}

	function closeCoverageMenu() {
		isCoverageMenuOpen = false;
	}

	function syncScrollState() {
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		scrollProgress = docHeight > 0 ? window.scrollY / docHeight : 0;
		showFloatingNav = window.scrollY > window.innerHeight * 0.72;
	}

	function nextProduct() {
		activeProductIndex = (activeProductIndex + 1) % products.length;
		restartProductTimer();
	}

	function previousProduct() {
		activeProductIndex = (activeProductIndex + products.length - 1) % products.length;
		restartProductTimer();
	}

	function selectProduct(index: number) {
		activeProductIndex = index;
		restartProductTimer();
	}

	function restartProductTimer() {
		if (!productTimer) return;
		clearInterval(productTimer);
		productTimer = setInterval(nextProduct, 20000);
	}

	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		syncScrollState();
		window.addEventListener('scroll', syncScrollState, { passive: true });

		if (!reduceMotion) {
			productTimer = setInterval(nextProduct, 20000);
		}

		return () => {
			window.removeEventListener('scroll', syncScrollState);
			if (productTimer) clearInterval(productTimer);
		};
	});
</script>

<svelte:head>
	<title>ISEC Insurance Agency</title>
	<meta
		name="description"
		content="Compare insurance covers from trusted partners and find flexible protection for life, medical, motor, business, and more."
	/>
</svelte:head>

<main class="site-shell">
	<div
		class="scroll-progress"
		style:transform={`scaleX(${scrollProgress})`}
		aria-hidden="true"
	></div>

	<section class="hero-section" id="top" aria-label="ISEC Insurance landing page">
		<div class="ambient ambient-two"></div>

		<SiteNav
			{closeCoverageMenu}
			{isCoverageMenuOpen}
			{sectionHref}
			toggleCoverageMenu={() => (isCoverageMenuOpen = !isCoverageMenuOpen)}
		/>

		{#if isCoverageMenuOpen}
			<CoverageMenu
				{activeCoverageIndex}
				selectCoverage={(index) => (activeCoverageIndex = index)}
			/>
		{/if}

		<LandingHero />
		<ProductCarousel {activeProductIndex} {nextProduct} {previousProduct} {selectProduct} />
		<ServiceBand />
		<GrowthSection />
		<MetricGrid />
	</section>

	<FloatingSectionNav {closeCoverageMenu} {sectionHref} {showFloatingNav} />
	<PartnerSection />
	<ProofSection />
	<FaqSection {openFaqIndex} {toggleFaq} />
	<SiteFooter />
</main>
