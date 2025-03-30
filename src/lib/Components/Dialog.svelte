<script lang='ts'>
  import { _ as t } from 'svelte-i18n'

  import { blur } from 'svelte/transition'
  import { cubicInOut } from "svelte/easing";
  import { afterUpdate } from 'svelte';

  /** Whether the dialog is visible and should render */
  export let visible: boolean = false;
  /** Image to show in the background of the dialog header */
  export let image: string = '';
  /** Title of the dialog (not HTML title) */
  export let title: string;
  /** Calls this function when the dialog is closed */
  export let onClose: () => void = () => {};

  /** Does not make the dialog fullscreen when mobile */
  export let noMobileUi: boolean = false;

  let header: HTMLHeadingElement;

  // TODO: ACCESSIBILITY NEEDS TO BE PROPERLY DONE
  // Current solution works for the main Lodestone website but might not be flexible enough, plus scrollable containers still have tabindex

  export const closeDialog = (): void => {
    const elements = Array.from(document.querySelectorAll('button, input, select, textarea, a[href], [tabindex]:not([tabindex="0"])')).filter(el => !el.closest('.dialog'));
    elements.forEach((el: HTMLElement) => {
      el.tabIndex = 0;
    });

    document.body.style.overflow = "auto";
    document.body.ariaHidden = "false";
    document.body.ariaDisabled = "false";

    visible = false
    onClose();
  };

  export const showDialog = (): void => {
    const elements = Array.from(document.querySelectorAll('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])')).filter(el => !el.closest('.dialog'));
    elements.forEach((el: HTMLElement) => {
      el.tabIndex = -1;
    });

    document.body.style.overflow = "hidden";
    document.body.ariaHidden = "true";
    document.body.ariaDisabled = "true";

    visible = true
  };

  export const toggleVisibility = (): void => {
    const elements = Array.from(document.querySelectorAll('button, input, select, textarea, a[href]')).filter(el => !el.closest('.dialog'));
    elements.forEach((el: HTMLElement) => {
        el.tabIndex = !visible ? -1 : 0;
    });

    visible = !visible
    document.body.style.overflow = visible ? "hidden" : "auto";
    document.body.ariaHidden = visible ? "true" : "false";
    document.body.ariaDisabled = visible ? "true" : "false";
  };

  afterUpdate(() => {
    if (visible && header) {
      header.focus();
    }
  });
</script>

{#if visible}
  <div class="dialog" transition:blur={{ duration: 200, easing: cubicInOut }} aria-disabled="false">
    <div class="dialogContent" class:mobileUi={!noMobileUi}>
      <div id="bg" class="dialogHeader" style="margin-top:10px;background-image:{image};background-color:var(--bg)">
        <!-- todo: make this look like actual close button -->
        <button on:click={closeDialog} title={$t('dialog.close.title')} aria-label={$t('dialog.close.ariaLabel')} class="closeButton"><i class="fa-solid fa-x"></i></button>
        <h2 bind:this={header}>{title}</h2>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
{/if}

<style>
  .dialog {
    z-index: 5;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
  }

  .dialogHeader {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--bg);
    padding: 0 10px 10px;
  }

  .dialogHeader h2 {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
  }

  .dialogContent {
    display: flex;
    flex-direction: column;
    background-color: var(--bg);
    border-top: 5px solid var(--accent-saturated);
    margin-top: 5%;
    border-radius: 10px;
    max-height: 80%;
    height: auto;
    width: 50%;
    transition: width 200ms ease-out, height 200ms ease-out, margin-top 200ms ease-out;
  }

  .closeButton {
    display: flex;
    width: 1.8em;
    height: 1.8em;
    font-size: 1.4em;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 100%;
    border-radius: 10px;
  }

  @media (max-width: 1080px) {
    .dialogContent {
      width: 80%;
    }
  }

  @media (max-width: 300px) {
    .dialogContent:not(.mobileUi) {
      width: 90%;
    }
  }

  @media (max-width: 260px) {
    .dialogContent:not(.mobileUi) {
      width: 100%;
    }
  }

  .mobileUi {
    @media (max-width: 710px) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
        padding-bottom: 5%;
    }
  }

  .mobileUi {
  @media (max-height: 620px) {
      margin-top: 3%;
      padding-bottom: 3%;
    }
  }

  .mobileUi {
    @media (max-height: 560px) {
        margin-top: 2%;
        padding-bottom: 2%;
    }
  }

  .mobileUi {
    @media (max-height: 480px) {
        margin-top: 1%;
        padding-bottom: 1%;
    }
  }

  .mobileUi {
    @media (max-height: 400px) {
        margin-top: 0;
        padding-bottom: 0;
    }
  }
</style>