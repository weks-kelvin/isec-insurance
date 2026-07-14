<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { imageUrl } from '$lib/utils/assets';
</script>

<section class="growth-section reveal" id="quote" use:reveal>
	<img class="shape shape-left" src={imageUrl('Vector (2).svg')} alt="" aria-hidden="true" />
	<img class="shape shape-right" src={imageUrl('Group.svg')} alt="" aria-hidden="true" />

	<div class="wave" aria-hidden="true"></div>
	<h1>Coverage<br />That Grows<br />With You</h1>
	<p>
		Whether you need car, home, health, travel, or business insurance, we help you find flexible
		protection tailored to your lifestyle and budget.
	</p>
	<a class="primary-button large" href="mailto:hello@isec.co.ke"
		>Customise your quote <span aria-hidden="true">&rsaquo;</span></a
	>
</section>
