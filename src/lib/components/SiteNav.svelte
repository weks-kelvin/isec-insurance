<script lang="ts">
	import type { SectionId } from '$lib/isec-data';
	import { imageUrl } from '$lib/utils/assets';

	type NavigateToSection = (sectionId: SectionId, event: MouseEvent) => void;

	let {
		isCoverageMenuOpen,
		navigateToSection,
		toggleCoverageMenu
	}: {
		isCoverageMenuOpen: boolean;
		navigateToSection: NavigateToSection;
		toggleCoverageMenu: () => void;
	} = $props();
</script>

<nav class="site-nav reveal is-revealed">
	<a
		class="brand"
		href="/"
		aria-label="ISEC Insurance Agency home"
		onclick={(event) => navigateToSection('top', event)}
	>
		<span class="brand-mark">
			isec
			<img src={imageUrl('butterfly.svg')} alt="" aria-hidden="true" />
		</span>
		<span class="brand-text">Insurance<br />Agency</span>
	</a>

	<div class="nav-links" aria-label="Primary navigation">
		<button class="nav-link-button" type="button" onclick={toggleCoverageMenu}
			>Insurance Cover</button
		>
		<a href="/services" onclick={(event) => navigateToSection('services', event)}>Services</a>
		<a href="/partners" onclick={(event) => navigateToSection('partners', event)}>Company</a>
		<a href="/support" onclick={(event) => navigateToSection('support', event)}>Support</a>
	</div>

	<div class="nav-actions">
		<a class="message-link" href="mailto:hello@isec.co.ke" aria-label="Send message">
			<img src={imageUrl('mail.svg')} alt="" />
			<span>Send message</span>
		</a>
		<button class="icon-button" type="button" aria-label="Search">
			<img src={imageUrl('Frame 3054.svg')} alt="" />
		</button>
		<button
			class="primary-button"
			type="button"
			aria-controls="coverage-menu"
			aria-expanded={isCoverageMenuOpen}
			onclick={toggleCoverageMenu}
		>
			Get Coverage
		</button>
	</div>
</nav>
