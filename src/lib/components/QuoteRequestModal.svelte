<script lang="ts">
	let {
		onClose,
		services
	}: {
		onClose: () => void;
		services: readonly string[];
	} = $props();

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let service = $state('');
	let message = $state('');

	function clearAll() {
		name = '';
		email = '';
		phone = '';
		service = '';
		message = '';
	}

	function submitForm(event: SubmitEvent) {
		event.preventDefault();
		const body = [
			`Name: ${name}`,
			`Email: ${email}`,
			`Phone: ${phone}`,
			`Service: ${service}`,
			'',
			'Message:',
			message
		].join('\n');
		const subject = encodeURIComponent('Quote request from website');
		const encodedBody = encodeURIComponent(body);
		window.location.href = `mailto:info@isecinsuranceagency.com?subject=${subject}&body=${encodedBody}`;
	}

</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') onClose();
	}}
/>

<div class="quote-modal-backdrop">
	<button
		type="button"
		class="quote-modal-dismiss"
		onclick={onClose}
		aria-label="Close quote form"
	></button>
	<dialog class="quote-modal" open aria-labelledby="quote-modal-title">
		<header class="quote-modal-header">
			<h2 id="quote-modal-title">Get a free quote</h2>
			<button type="button" class="quote-modal-close" onclick={onClose} aria-label="Close quote form"
				>&times;</button
			>
		</header>

		<form class="quote-form" onsubmit={submitForm}>
			<input type="text" placeholder="Your Name" bind:value={name} required />
			<input type="email" placeholder="Email" bind:value={email} required />
			<input type="tel" placeholder="Phone no" bind:value={phone} required />
			<select bind:value={service} required>
				<option value="" disabled selected={service === ''}>select a service</option>
				{#each services as item}
					<option value={item}>{item}</option>
				{/each}
			</select>
			<textarea rows="5" placeholder="Message" bind:value={message} required></textarea>
			<div class="quote-form-actions">
				<button type="submit" class="quote-submit">Get free quote</button>
				<button type="button" class="quote-clear" onclick={clearAll}>Clear all</button>
			</div>
		</form>
	</dialog>
</div>


