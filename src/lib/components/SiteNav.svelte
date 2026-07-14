<script lang="ts">
	import type { SectionId } from '$lib/isec-data';
	import { imageUrl } from '$lib/utils/assets';
	import { reveal } from '$lib/actions/reveal';
	import { trackEvent } from '$lib/utils/analytics';

	type SectionHref = (sectionId: SectionId) => string;

	let {
		closeCoverageMenu,
		isCoverageMenuOpen,
		sectionHref,
		toggleCoverageMenu
	}: {
		closeCoverageMenu: () => void;
		isCoverageMenuOpen: boolean;
		sectionHref: SectionHref;
		toggleCoverageMenu: () => void;
	} = $props();

	function handleCoverageToggle() {
		toggleCoverageMenu();
		trackEvent('coverage_menu_toggle', { isOpening: !isCoverageMenuOpen });
	}

	function handleNavClick(sectionId: SectionId) {
		closeCoverageMenu();
		trackEvent('nav_click', { sectionId });
	}
</script>

<nav class="site-nav reveal is-revealed" use:reveal>
	<a
		class="brand"
		href={sectionHref('top')}
		aria-label="ISEC Insurance Agency home"
		onclick={() => handleNavClick('top')}
	>
		<span class="brand-mark">
			isec
			<img src={imageUrl('butterfly.svg')} alt="" aria-hidden="true" decoding="async" />
		</span>
		<span class="brand-text">Insurance<br />Agency</span>
	</a>

	<div class="nav-links" aria-label="Primary navigation">
		<button class="nav-link-button" type="button" onclick={handleCoverageToggle}
			>Insurance Cover</button
		>
		<a href={sectionHref('services')} onclick={() => handleNavClick('services')}>Services</a>
		<a href={sectionHref('partners')} onclick={() => handleNavClick('partners')}>Company</a>
		<a href={sectionHref('support')} onclick={() => handleNavClick('support')}>Support</a>
	</div>

	<div class="nav-actions">
		<a class="message-link" href="mailto:hello@isec.co.ke" aria-label="Send message">
			<img src={imageUrl('mail.svg')} alt="" loading="lazy" decoding="async" />
			<span>Send message</span>
		</a>
		<button class="icon-button" type="button" aria-label="Search">
			<img src={imageUrl('Frame 3054.svg')} alt="" loading="lazy" decoding="async" />
		</button>
		<button
			class="primary-button"
			type="button"
			aria-controls="coverage-menu"
			aria-expanded={isCoverageMenuOpen}
			onclick={handleCoverageToggle}
		>
			Get Coverage
		</button>
	</div>
</nav>
