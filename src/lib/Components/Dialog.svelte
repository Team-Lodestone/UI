<script lang='ts'>
  import { _ as t } from 'svelte-i18n'

  import { blur } from 'svelte/transition'
  import { cubicInOut } from "svelte/easing";

  export let visible: boolean = false;
  export let image: string = '';
  export let title: string;
  export let onClose: () => void = () => {};

  export const closeDialog = (): void => {
    visible = false
    document.body.style.overflow = "auto";
    onClose();
  };

  export const showDialog = (): void => {
    document.body.style.overflow = "hidden";
    visible = true
  };

  export const toggleVisibility = (): void => {
    visible = !visible
    document.body.style.overflow = visible ? "hidden" : "auto";
  };
</script>

<svelte:options accessors={true}/>

{#if visible}
  <div class="dialog" transition:blur={{ duration: 200, easing: cubicInOut }}>
    <div class="dialogContent">
      <div id="bg" class="dialogHeader" style="margin-top:10px;background-image:{image};background-color:var(--bg)">
        <!-- todo: make this look like actual close button -->
        <button on:click={closeDialog} title={$t('dialog.close.title')} aria-label={$t('dialog.close.ariaLabel')} class="closeButton"><i class="fa-solid fa-x"></i></button>
        <h2>{title}</h2>
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

  @media (max-width: 710px) {
    .dialogContent {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      width: 100%;
      height: 100%;
      max-height: 100%;
      padding-bottom: 5%;
    }
  }

  @media (max-height: 620px) {
    .dialogContent {
      margin-top: 3%;
      padding-bottom: 3%;
    }
  }

  @media (max-height: 560px) {
    .dialogContent {
      margin-top: 2%;
      padding-bottom: 2%;
    }
  }

  @media (max-height: 480px) {
    .dialogContent {
      margin-top: 1%;
      padding-bottom: 1%;
    }
  }

  @media (max-height: 400px) {
    .dialogContent {
      margin-top: 0;
      padding-bottom: 0;
    }
  }
</style>