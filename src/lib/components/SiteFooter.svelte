<script lang="ts">
	import { imageUrl } from '$lib/utils/assets';

	const currentYear = new Date().getFullYear();
</script>

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
