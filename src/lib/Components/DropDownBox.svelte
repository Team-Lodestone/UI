<script lang="ts">
  /** Text shown above the header */
  export let header: string | undefined = undefined;
  /** Default value of the DropDownBox */
  export let value: any = null;
  /** What shows when you hover over it (HTML: title) */
  export let tooltip: string = "";
  /** What should happen on selection change */
  export let selectionChange: (e: Event) => void = (e) => {};
</script>

<div class:DropDownBox={true} {...$$props}>
  {#if header}
    <h3 class="header">{header}</h3>
  {/if}
  <!-- wish you could pass the normal on:change to DropDownBox and have it passed to this. -->
  <select bind:value={value} on:change={selectionChange} title={tooltip}>
    <slot />
  </select>
</div>

<style>
  .DropDownBox {
    align-content: center;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .header {
    margin: 5px;
  }

</style>