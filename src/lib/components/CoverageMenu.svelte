<script lang="ts">
	import { coverages } from '$lib/isec-data';
	import { imageUrl } from '$lib/utils/assets';

	let {
		activeCoverageIndex,
		selectCoverage
	}: {
		activeCoverageIndex: number;
		selectCoverage: (index: number) => void;
	} = $props();

	const activeCoverage = $derived(coverages[activeCoverageIndex]);
</script>

<div class="cover-panel cover-dropdown reveal is-revealed" id="coverage-menu">
	<div class="cover-list">
		<p class="eyebrow">Insurance Cover</p>
		{#each coverages as coverage, index (coverage.title)}
			<button
				class:is-selected={activeCoverageIndex === index}
				class="cover-item"
				type="button"
				onclick={() => selectCoverage(index)}
			>
				<span class="cover-icon">
					<img src={imageUrl(coverage.icon)} alt={`${coverage.title} icon`} />
				</span>
				<span>
					<strong>{coverage.title}</strong>
					<small>{coverage.description}</small>
				</span>
			</button>
		{/each}
	</div>

	<article class="cover-feature">
		<img src={imageUrl(activeCoverage.previewImage)} alt={activeCoverage.previewTitle} />
		<span>{activeCoverage.previewTitle}</span>
	</article>
</div>
