<script lang="ts">
	import { slide } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	/** Title shown on the slider */
	export let title;

	let isExpanded = false;

	function toggleExpanded(): void {
		isExpanded = !isExpanded;
	}

	function handleKeydown(event: Event): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleExpanded();
		}
	}
</script>

<div class="slideUp">
	<div
		class="slideHeader"
		on:click={toggleExpanded}
		on:keydown={handleKeydown}
		role="button"
		tabindex="0"
		title={$t('LodestoneUI.SlideUp.title', {
			values: {
				action: isExpanded
					? $t('LodestoneUI.SlideUp.actions.close')
					: $t('LodestoneUI.SlideUp.actions.open')
			}
		})}
		aria-label={$t('LodestoneUI.SlideUp.ariaLabel', {
			values: {
				title: title,
				action: isExpanded
					? $t('LodestoneUI.SlideUp.actions.close')
					: $t('LodestoneUI.SlideUp.actions.open')
			}
		})}
	>
		<p style="margin-left: 10px;">{title}</p>
		<button
			style="margin-left: auto;margin-right: 10px;"
			title={$t('LodestoneUI.SlideUp.title', {
				values: {
					action: isExpanded
						? $t('LodestoneUI.SlideUp.actions.close')
						: $t('LodestoneUI.SlideUp.actions.open')
				}
			})}
			aria-label={$t('LodestoneUI.SlideUp.ariaLabel', {
				values: {
					title: title,
					action: isExpanded
						? $t('LodestoneUI.SlideUp.actions.close')
						: $t('LodestoneUI.SlideUp.actions.open')
				}
			})}><i class={`fa-solid ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i></button
		>
	</div>
	{#if isExpanded}
		<div class="slider" transition:slide>
			<slot></slot>
		</div>
	{/if}
</div>

<style>
	.slideHeader {
		display: flex;
		flex-direction: row;
		background-color: var(--bg-alt-2);
		justify-content: center;
		align-items: center;
	}

	.slider {
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: var(--bg-alt-2);
		gap: 10px;
		padding-bottom: 10px;
	}
</style>
