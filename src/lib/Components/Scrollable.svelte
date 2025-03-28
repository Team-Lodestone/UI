<script lang="ts">
    import { _ as t } from 'svelte-i18n'
    import {blur} from "svelte/transition";

    export let onScrollLeft: () => void;
    export let onScrollRight: () => void;
</script>

<div class="Scrollable" transition:blur={{ duration: 200 }}>
    <button on:click={onScrollLeft} class="arrowLeft arrow fa-solid fa-arrow-left" title={$t('scrollable.arrows.left.title')} aria-label={$t('scrollable.arrows.left.ariaLabel')}></button>
    <button on:click={onScrollRight} class="arrowRight arrow fa-solid fa-arrow-right" title={$t('scrollable.arrows.right.title')} aria-label={$t('scrollable.arrows.right.ariaLabel')}></button>
</div>

<style>
    .Scrollable {
        display: flex;
        flex-direction: row;
        background-color: var(--bg-alt);
        padding: 5px;
        border-radius: 0 0 10px 10px;
        border: 2px solid var(--bg-border);
    }

    .arrow {
        padding: 10px !important;
        background-color: var(--bg-alt-2);
    }

    .arrowRight {
        margin-left: auto;
    }
</style>