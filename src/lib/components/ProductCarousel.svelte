<script lang="ts">
	import { products } from '$lib/isec-data';
	import { reveal } from '$lib/actions/reveal';
	import { imageUrl } from '$lib/utils/assets';

	let {
		activeProductIndex,
		nextProduct,
		previousProduct,
		selectProduct
	}: {
		activeProductIndex: number;
		nextProduct: () => void;
		previousProduct: () => void;
		selectProduct: (index: number) => void;
	} = $props();
</script>

<section class="product-stage reveal" id="cover" aria-label="Insurance products" use:reveal>
	<div class="product-track">
		{#each products as product, index (`${product.title}-${index}`)}
			<button
				type="button"
				class:product-card-wide={index === activeProductIndex}
				class:is-active={index === activeProductIndex}
				class="product-card"
				data-product={product.title.toLowerCase()}
				aria-label={`Show ${product.title} insurance`}
				onclick={() => selectProduct(index)}
			>
				<img src={imageUrl(product.image)} alt={`${product.title} insurance`} />
				<span class="product-title">
					{product.title}
					{#if index === activeProductIndex}
						<img
							class="product-butterfly"
							src={imageUrl('butterfly.svg')}
							alt=""
							aria-hidden="true"
						/>
					{/if}
				</span>
				{#if index === activeProductIndex}
					<span class="product-divider" aria-hidden="true"></span>
					<span class="product-copy">{product.body}</span>
				{/if}
			</button>
		{/each}
	</div>

	<div class="slider-controls" aria-label="Product carousel controls">
		<div class="dots">
			{#each products as product, index (`${product.title}-dot-${index}`)}
				<button
					type="button"
					class:is-active={index === activeProductIndex}
					aria-label={`View ${product.title} insurance`}
					onclick={() => selectProduct(index)}
				></button>
			{/each}
		</div>
		<div class="arrows">
			<button type="button" aria-label="Previous product" onclick={previousProduct}>&lsaquo;</button
			>
			<button type="button" aria-label="Next product" onclick={nextProduct}>&rsaquo;</button>
		</div>
	</div>
</section>
