<script lang="ts">
    /** The logo that should be shown in the footer */
    export let logo: string;

    /** Notice at the bottom of the footer */
    export let notice;
</script>

<div class="Footer">
    {#if logo}
        <img src={logo} class="logo" alt="Logo">
    {/if}
    <div class="items">
        <slot></slot>
    </div>
    <div class="notice">{notice}</div>
</div>

<style>
    .items {
        display: flex;
        margin-top: 10px;
        gap: 10px;
    }

    .notice {
        margin-top: 20px;
        font-weight: bold;
    }

    .Footer {
        margin-top: 20px;
        padding-top: 10px;
        border-top: 2px solid var(--bg-border);
        padding-bottom: 20px;
        background-color: var(--bg-alt-2);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .logo {
        width: 256px;
        height: 64px;
        transition: filter 300ms, width 200ms ease-out, height 200ms ease-out;
    }

    .logo:hover {
        filter: drop-shadow(0 0 0.5em var(--accent-saturated));
    }
</style>