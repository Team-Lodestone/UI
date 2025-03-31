<script lang="ts">
	import { t } from 'svelte-i18n';

	/** The option's title */
	export let title: string;
	/** The option's description */
	export let description: string = $t('LodestoneUI.Option.description');
</script>

<div class="Setting">
	<div class="info">
		<h2>{title}</h2>
		<p>{description}</p>
	</div>
	<div class="options">
		<slot></slot>
	</div>
</div>

<style>
	.Setting {
		display: flex;
		justify-content: flex-start;
		width: 500px;
		align-items: center;
		background-color: var(--bg-alt);
		border-radius: 10px;
		padding: 10px;
		border: 2px solid var(--bg-border);
	}

	.info h2 {
		margin-bottom: 0;
		margin-top: 0;
	}

	.info p {
		margin-top: 5px;
		margin-bottom: 0;
	}

	.options {
		margin-left: auto;
		padding-right: 10px;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
