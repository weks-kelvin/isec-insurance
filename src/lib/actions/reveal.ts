export function reveal(node: HTMLElement) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry?.isIntersecting) return;
			node.classList.add('is-revealed');
			observer.disconnect();
		},
		{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
