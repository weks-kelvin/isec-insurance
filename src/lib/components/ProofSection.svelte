<script lang="ts">
	import { testimonials } from '$lib/isec-data';
	import { reveal } from '$lib/actions/reveal';
</script>

<section class="proof-section reveal" use:reveal>
	<div class="proof-copy">
		<p class="review-pill">Excellent 4.8 out of 5 by <span>&#9733;</span> Google Review</p>
		<h2>Proof is in the progress.</h2>
		<p class="proof-lead">Our members make progress, feel peace of mind, and spread the word.</p>
		<small>
			Ratings and reviews are provided by customers of ISEC Insurance and may not represent the
			experience of all clients. No compensation was provided for reviews. Testimonials and ratings
			are for informational purposes only and are not indicative of future results or experiences.
			Individual savings and coverage outcomes may vary.
		</small>
	</div>

	<div class="testimonial-cloud" aria-label="Customer testimonials">
		{#each testimonials as testimonial, index (testimonial.title)}
			<article class={`testimonial-card tone-${testimonial.tone}`} style={`--card-index:${index}`}>
				<div class="stars" aria-label="Five star rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
				<h3>{testimonial.title}</h3>
				<p>{testimonial.body}</p>
			</article>
		{/each}
	</div>
</section>
