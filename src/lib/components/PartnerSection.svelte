<script lang="ts">
	import { partners } from '$lib/isec-data';
	import { reveal } from '$lib/actions/reveal';
	import { imageUrl } from '$lib/utils/assets';
</script>

<section class="partner-section reveal" id="partners" use:reveal>
	<div class="wave-divider" aria-hidden="true"></div>
	<h2>We work with 100+ companies to find the best match for you!</h2>
	<div class="partner-marquee">
		<div>
			{#each partners as partner (partner.name)}
				<img src={imageUrl(partner.logo)} alt={partner.name} />
			{/each}
			{#each partners as partner (`${partner.name}-repeat`)}
				<img src={imageUrl(partner.logo)} alt={partner.name} />
			{/each}
		</div>
	</div>
</section>
