<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { imageUrl } from '$lib/utils/assets';

	let { openQuoteModal }: { openQuoteModal: () => void } = $props();
</script>

<section class="growth-section reveal" id="quote" use:reveal>
	<div class="wave" aria-hidden="true"></div>
	<h1>
		Coverage<br />That Grows<br />With You
		<img class="growth-butterfly" src={imageUrl('butterfly.svg')} alt="" aria-hidden="true" />
	</h1>
	<p>
		Whether you need car, home, health, travel, or business insurance, we help you find flexible
		protection tailored to your lifestyle and budget.
	</p>
	<button class="primary-button large" type="button" onclick={openQuoteModal}
		>Customise your quote <span aria-hidden="true">&rsaquo;</span></button
	>
</section>
