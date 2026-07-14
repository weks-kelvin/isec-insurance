<script lang="ts">
	import type { SectionId } from '$lib/isec-data';
	import { imageUrl } from '$lib/utils/assets';
	import { reveal } from '$lib/actions/reveal';

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
</script>

<nav class="site-nav reveal is-revealed" use:reveal>
	<a
		class="brand"
		href={sectionHref('top')}
		aria-label="ISEC Insurance Agency home"
		onclick={closeCoverageMenu}
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
		<a href={sectionHref('services')} onclick={closeCoverageMenu}>Services</a>
		<a href={sectionHref('partners')} onclick={closeCoverageMenu}>Company</a>
		<a href={sectionHref('support')} onclick={closeCoverageMenu}>Support</a>
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
