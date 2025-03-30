<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let text: string;

	let tooltip: HTMLDivElement;
	let tooltipText: HTMLParagraphElement;
	let visible: boolean = false;
	let isHoveringOverTooltip: boolean = false;
	// TODO: Allow the user to set the side that the tooltip shows on
	// TODO: for some reason screen readers such as ZoomText won't automatically read the tooltip when hovered

	export function show() {
		setTimeout(() => {
			visible = true;
			if (tooltipText) {
				tooltipText.focus();
			}
		}, 100);
	}

	export function hoverTooltip() {
		isHoveringOverTooltip = true;
		setTimeout(() => {
			visible = true;
		}, 100);
	}

	export function stopHoverTooltip() {
		isHoveringOverTooltip = false;
		setTimeout(() => {
			visible = false;
		}, 100);
	}

	export function hide() {
		setTimeout(() => {
			if (!isHoveringOverTooltip) {
				visible = false;
			}
		}, 100);
	}
</script>

<div aria-describedby="tooltipText" bind:this={tooltip} class="Tooltip" on:focusin={show} on:focusout={hide}
		 on:mouseenter={show} on:mouseleave={hide}>
	{#if visible}
		<p class="tooltipText" id="tooltipText" transition:fade={{ duration: 200, easing: cubicInOut }}
			 bind:this={tooltipText} on:mouseenter={hoverTooltip} aria-live="polite" on:mouseleave={stopHoverTooltip}
			 role="tooltip">{text}</p>
	{/if}
	<slot />
</div>

<style>
    .Tooltip {
        display: inline-flex;
        flex-direction: column;
        position: relative;
    }

    .tooltipText {
        width: 210px;
        background-color: var(--bg-darker);
        border: 2px solid var(--bg-border-darker);
        text-align: center;
        padding: 5px 0;
        border-radius: 5px;

        position: absolute;
        z-index: 1;

        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 10px;
    }
</style>