<script lang="ts">
	import { metrics } from '$lib/isec-data';
	import { reveal } from '$lib/actions/reveal';
	import { imageUrl } from '$lib/utils/assets';
</script>

<section class="metric-grid reveal" aria-label="ISEC proof points" use:reveal>
	{#each metrics as metric (metric.label)}
		<article class={`metric-card metric-${metric.tone}`}>
			{#if metric.image}
				<img
					src={imageUrl(metric.image)}
					alt=""
					aria-hidden="true"
					loading="lazy"
					decoding="async"
				/>
			{/if}
			<div>
				<strong>{metric.value}</strong>
				<h3>{metric.label}</h3>
				<p>{metric.body}</p>
			</div>
		</article>
	{/each}
</section>
