<script lang="ts">
    import { type Writable } from "svelte/store";

    /** The store that will store whether to use Mobile UI */
    export let isMobile: Writable<boolean>;

    /** Determines whether to render the text part of the button or not.
     *
     * If true, any text put into `slot` does not get rendered.
     */
    export let usesIcon: boolean = false;

    /** Determines whether the button is disabled
     *
     * Disabled buttons cannot be clicked and are visually darkened.
     */
    export let disabled: boolean = false;

    /** Shows button text based on if the site is using mobile UI */
    export let mobileTitle: string = "";

    export let onClick: () => void = () => {};
</script>

<a class:disabled={disabled} draggable="false" aria-disabled={disabled} on:click={(e) => {if (disabled) e.preventDefault(); else onClick();}} {...$$props}>
    {#if usesIcon}
        {#if !$isMobile}
            <slot></slot>
        {:else}
            {mobileTitle !== "" ? mobileTitle : $$props['title']}
        {/if}
    {:else}
        <slot></slot>
    {/if}
</a>