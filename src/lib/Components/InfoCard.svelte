<script lang="ts">
	/** Title (alt text) of the icon in the card */
	export let title: string;
	/** Icon class of the card */
	export let icon: string;
	/** Alt text of the icon */
	export let alt: string = '';
</script>

<div class="InfoCard">
	{#if icon !== ''}
		<i class="icon {icon}" title={alt} aria-label={alt}></i>
	{/if}
	<h2 class="title">{title}</h2>
	<p class="desc"><slot></slot></p>
</div>

<style>
	.InfoCard {
		border-radius: 10px;
		border: 2px solid var(--bg-border);
		background-color: var(--bg-alt);
		width: 480px;
		height: 280px;
		padding: 10px;
		transition:
			border 200ms,
			width 300ms ease-out;
	}

	@media (max-width: 1065px) {
		.InfoCard {
			width: 100%;
		}
	}

	.InfoCard:hover {
		border-color: var(--accent-border);
	}

	.icon {
		font-size: 2.4rem;
		width: 4rem;
		height: 4rem;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-radius: 5px;
		background-color: var(--bg-alt-2);
		color: var(--accent-theme);
	}

	.title {
		font-weight: bold;
	}

	.desc {
		color: var(--text-unfocused);
		white-space: pre-line;
	}
</style>
