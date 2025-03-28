<script lang="ts">
import { _ as t } from 'svelte-i18n'
import { navigate } from "svelte5-router";
import { onMount } from "svelte";
import { listen as addListener } from 'svelte5-router';
import { slide } from 'svelte/transition';
import { type Writable } from 'svelte/store';

/** Determines whether the expander should be shown */
let isExpanded = false;

/** What logo should be shown in the topbar */
export let logo: string;

/** The store that will store whether to use Mobile UI */
export let isMobile: Writable<boolean>;

/** A function to modify the Mobile UI store */
export let setMobile: () => void;

/** Sets the UI mode, and closes the expander if it's open */
const checkMobile = () => {
  setMobile();
  if ($isMobile) isExpanded = false;
};

/** Toggles the expander open state */
const setExpanded = () => {
  isExpanded = !isExpanded;
};

/** Current path, used for theming the topbar */
let path = window.location.pathname;

onMount(async (): Promise<void> => {
  addListener(({ location }) => {
    path = location.pathname;
  })

  window.addEventListener('resize', checkMobile);

  return (() => {
    window.removeEventListener('resize', checkMobile);
  }) as unknown as void;
});
</script>

<div class:topbar={true} class:topbarHome={path === "/" && !isExpanded} {...$$props}>
  <div class="topbarItems">
    {#if logo}
    <button class="logoHome" title={$t('topbar.homeButton.title')} on:click={() => {navigate("/")}}><img class="logo-small" src={logo} alt={$t('topbar.homeButton.logo.alt')}></button>
    {/if}
    {#if !$isMobile}
      <div class="buttons">
        <slot></slot>
      </div>
    {/if}
    {#if $isMobile}
      <div class="buttons">
        <button on:click={setExpanded} aria-label={isExpanded ? $t('topbar.expander.ariaLabel.opened') : $t('topbar.expander.ariaLabel.closed')} title={isExpanded ? $t('topbar.expander.title.opened') : $t('topbar.expander.title.closed')} class="expand fa fa-bars"></button>
      </div>
    {/if}
  </div>

  {#if isExpanded && $isMobile}
    <div class={`mobileButtons`} transition:slide={{duration: 500}} on:introstart={e => (e.target as HTMLElement).classList.add('expanded')} on:outrostart={e => (e.target as HTMLElement).classList.remove('expanded')}>
      <slot></slot>
    </div>
  {/if}
</div>

<style>
  .logoHome {
    border-radius: 0 0 10px 0;
    display: flex;
    white-space: nowrap;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    padding: 0;
  }

  .topbar {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-alt-2);
    transition: background-color 200ms;
  }

  .mobileButtons {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px 0 10px 0;
    gap: 10px;
    background-color: var(--bg);
    transition: background-color 200ms;
  }

  .expanded {
    background-color: var(--bg-alt-2);
    border-bottom: 2px solid var(--bg-border);
  }

  .expand {
    padding: 10px !important;
    font-size: 25px;
  }

  .topbarItems {
    width: 100%;
    display: flex;
    padding: 0 0 5px 0;
    flex-direction: row;
  }

  .topbarHome {
    background-color: transparent !important;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-right: 10px;
    width: 100%;
  }

  .logo-small {
    -webkit-user-drag: none;
    height: 56px;
    width: 56px;
    will-change: filter;
    transition: filter 300ms, width 200ms ease-out, height 200ms ease-out;
  }

  .logo-small:hover {
    filter: drop-shadow(0 0 1.0em var(--accent-saturated));
  }
</style>