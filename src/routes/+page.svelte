<script lang="ts">
	import { onMount } from 'svelte';
	import {
		coverages,
		faqs,
		metrics,
		partners,
		products,
		supportFeatures,
		testimonials,
		type SectionId
	} from '$lib/isec-data';

	const assetPath = '/theme/assets/images/';
	const currentYear = new Date().getFullYear();

	let activeProductIndex = $state(1);
	let isCoverageMenuOpen = $state(false);
	let showFloatingNav = $state(false);
	let activeCoverageIndex = $state(0);
	let openFaqIndex = $state<number | null>(0);
	let scrollProgress = $state(0);
	let productTimer: ReturnType<typeof setInterval> | undefined;

	const activeCoverage = $derived(coverages[activeCoverageIndex]);

	function imageUrl(fileName: string) {
		return `${assetPath}${fileName}`;
	}

	function pathForSection(sectionId: SectionId) {
		return sectionId === 'top' ? '/' : `/${sectionId}`;
	}

	function sectionFromPath(pathname: string): SectionId {
		const cleanPath = pathname.replace(/^\/|\/$/g, '');
		if (
			cleanPath === 'cover' ||
			cleanPath === 'services' ||
			cleanPath === 'quote' ||
			cleanPath === 'partners' ||
			cleanPath === 'support'
		) {
			return cleanPath;
		}

		return 'top';
	}

	function scrollToSection(sectionId: SectionId, behavior: ScrollBehavior) {
		document.getElementById(sectionId)?.scrollIntoView({ behavior, block: 'start' });
	}

	function navigateToSection(sectionId: SectionId, event: MouseEvent) {
		event.preventDefault();
		isCoverageMenuOpen = false;
		window.history.pushState(null, '', pathForSection(sectionId));
		scrollToSection(sectionId, 'smooth');
	}

	function syncScrollState() {
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		scrollProgress = docHeight > 0 ? window.scrollY / docHeight : 0;
		showFloatingNav = window.scrollY > window.innerHeight * 0.72;
	}

	function nextProduct() {
		activeProductIndex = (activeProductIndex + 1) % products.length;
	}

	function previousProduct() {
		activeProductIndex = (activeProductIndex + products.length - 1) % products.length;
		restartProductTimer();
	}

	function selectProduct(index: number) {
		activeProductIndex = index;
		restartProductTimer();
	}

	function restartProductTimer() {
		if (!productTimer) return;
		clearInterval(productTimer);
		productTimer = setInterval(nextProduct, 20000);
	}

	function toggleCoverageMenu() {
		isCoverageMenuOpen = !isCoverageMenuOpen;
	}

	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-revealed');
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
		);

		document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
		syncScrollState();
		window.setTimeout(() => scrollToSection(sectionFromPath(window.location.pathname), 'auto'));
		window.addEventListener('scroll', syncScrollState, { passive: true });
		window.addEventListener('popstate', () => scrollToSection(sectionFromPath(window.location.pathname), 'smooth'));

		if (!reduceMotion) {
			productTimer = setInterval(nextProduct, 20000);
		}

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', syncScrollState);
			if (productTimer) clearInterval(productTimer);
		};
	});
</script>

<svelte:head>
	<title>ISEC Insurance Agency</title>
	<meta
		name="description"
		content="Compare insurance covers from trusted partners and find flexible protection for life, medical, motor, business, and more."
	/>
</svelte:head>

<main class="site-shell">
	<div class="scroll-progress" style:transform={`scaleX(${scrollProgress})`} aria-hidden="true"></div>

	<section class="hero-section" id="top" aria-label="ISEC Insurance landing page">
		<div class="ambient ambient-two"></div>

		<nav class="site-nav reveal is-revealed">
			<a class="brand" href="/" aria-label="ISEC Insurance Agency home" onclick={(event) => navigateToSection('top', event)}>
				<span class="brand-mark">
					isec
					<img src={imageUrl('butterfly.svg')} alt="" aria-hidden="true" />
				</span>
				<span class="brand-text">Insurance<br />Agency</span>
			</a>

			<div class="nav-links" aria-label="Primary navigation">
				<button class="nav-link-button" type="button" onclick={toggleCoverageMenu}>Insurance Cover</button>
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

		{#if isCoverageMenuOpen}
			<div class="cover-panel cover-dropdown reveal is-revealed" id="coverage-menu">
				<div class="cover-list">
					<p class="eyebrow">Insurance Cover</p>
					{#each coverages as coverage, index (coverage.title)}
						<button
							class:is-selected={activeCoverageIndex === index}
							class="cover-item"
							type="button"
							onclick={() => (activeCoverageIndex = index)}
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
		{/if}

		<section class="landing-hero reveal is-revealed">
			<p class="hero-pill">Coverage you can count on</p>
			<h1>Your Reliable Partner In <span>All Insurance Matters</span></h1>
			<p>We offer a variety of products customer designed for all your insurance needs being;</p>
		</section>

		<section class="product-stage reveal" id="cover" aria-label="Insurance products">
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
								<img class="product-butterfly" src={imageUrl('butterfly.svg')} alt="" aria-hidden="true" />
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
					<button type="button" aria-label="Previous product" onclick={previousProduct}>&lsaquo;</button>
					<button type="button" aria-label="Next product" onclick={nextProduct}>&rsaquo;</button>
				</div>
			</div>
		</section>

		<section class="service-band reveal" id="services">
			<h2>We offer a variety of products customer designed for all your insurance needs being;</h2>
			<div class="service-grid">
				{#each supportFeatures as feature, index (feature.title)}
					<article>
						<img
							class:service-icon-sun={index === 0}
							class:service-icon-folder={index === 1}
							class:service-icon-orbit={index === 2}
							class="service-icon"
							src={imageUrl(feature.image)}
							alt={`${feature.title} icon`}
						/>
						<h3>{feature.title}</h3>
						<p>{feature.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="growth-section reveal" id="quote">
			<img class="shape shape-left" src={imageUrl('Vector (2).svg')} alt="" aria-hidden="true" />
			<img class="shape shape-right" src={imageUrl('Group.svg')} alt="" aria-hidden="true" />

			<div class="wave" aria-hidden="true"></div>
			<h1>Coverage<br />That Grows<br />With You</h1>
			<p>
				Whether you need car, home, health, travel, or business insurance, we help you find flexible
				protection tailored to your lifestyle and budget.
			</p>
			<a class="primary-button large" href="mailto:hello@isec.co.ke">Customise your quote <span aria-hidden="true">&rsaquo;</span></a>
		</section>

		<section class="metric-grid reveal" aria-label="ISEC proof points">
			{#each metrics as metric (metric.label)}
				<article class={`metric-card metric-${metric.tone}`}>
					{#if metric.image}
						<img src={imageUrl(metric.image)} alt="" aria-hidden="true" />
					{/if}
					<div>
						<strong>{metric.value}</strong>
						<h3>{metric.label}</h3>
						<p>{metric.body}</p>
					</div>
				</article>
			{/each}
		</section>
	</section>

	<nav class:is-visible={showFloatingNav} class="floating-section-nav" aria-label="Page sections">
		<a href="/services" onclick={(event) => navigateToSection('services', event)}>Features</a>
		<a href="/quote" onclick={(event) => navigateToSection('quote', event)}>Plans</a>
		<a href="/quote" onclick={(event) => navigateToSection('quote', event)}>Pricing</a>
		<a href="/cover" onclick={(event) => navigateToSection('cover', event)}>What's covered</a>
		<a href="/partners" onclick={(event) => navigateToSection('partners', event)}>Partners</a>
		<a href="/support" onclick={(event) => navigateToSection('support', event)}>FAQs</a>
		<a class="back-top" href="/" onclick={(event) => navigateToSection('top', event)}>Back to top</a>
	</nav>

	<section class="partner-section reveal" id="partners">
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

	<section class="proof-section reveal">
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

	<section class="faq-section reveal" id="support">
		<div class="faq-inner">
			<h2>Frequently asked questions</h2>
			<p>
				Questions on the ISEC Insurance? Find your answers below. For any further help or
				troubleshooting, please contact customer service.
			</p>

			<div class="faq-list">
				{#each faqs as faq, index (faq.question)}
					<article class:is-open={openFaqIndex === index} class="faq-item">
						<button type="button" onclick={() => toggleFaq(index)} aria-expanded={openFaqIndex === index}>
							<span>{faq.question}</span>
							<span aria-hidden="true">&#8964;</span>
						</button>
						{#if openFaqIndex === index}
							<p>{faq.answer}</p>
						{/if}
					</article>
				{/each}
			</div>
		</div>
	</section>

	<footer class="site-footer">
		<div class="social-links" aria-label="Social links">
			<a href="/" aria-label="Facebook"><img src={imageUrl('Social Icons1.svg')} alt="" /></a>
			<a href="/" aria-label="X"><img src={imageUrl('Social Icons 2.svg')} alt="" /></a>
			<a href="/" aria-label="Instagram"><img src={imageUrl('Social Icons3.svg')} alt="" /></a>
			<a href="/" aria-label="LinkedIn"><img src={imageUrl('Social Icons4.svg')} alt="" /></a>
			<a href="/" aria-label="YouTube"><img src={imageUrl('Vector.svg')} alt="" /></a>
		</div>
		<div class="footer-legal">
			<a href="/terms-and-conditions">Terms & Conditions</a>
			<a href="/privacy-policy">Privacy Policy</a>
			<span>&copy;{currentYear}, ISEC Insurance. All rights reserved.</span>
		</div>
	</footer>
</main>
