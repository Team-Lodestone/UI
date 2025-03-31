<script lang="ts">
	/** Determines whether the button is disabled
	 *
	 * Disabled buttons cannot be clicked and are visually darkened.
	 */
	export let disabled = false;
</script>

<a
	{...$$props}
	class:disabled
	aria-disabled={disabled}
	draggable="false"
	on:click={(e) => {
		if (disabled) e.preventDefault();
	}}
>
	<slot></slot>
</a>
