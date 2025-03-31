<script lang="ts">
	import { t } from 'svelte-i18n';

	/** Called when a file/folder is chosen */
	export let onChosen: (e: Event) => void = (): void => {};

	let picker: HTMLInputElement;
	let label: HTMLLabelElement;
	/** Whether to let the user pick a folder
	 *
	 * Note that this is not supported on some browsers due to webkitdirectory not being standard.
	 */
	export let folder: boolean = false;
	/** Whether to let the user pick multiple files */
	export let multiple: boolean = false;
	/** The text to show on the button */
	export let text: string = $t('LodestoneUI.FSPickerButton.title', {
		values: {
			type: folder
				? $t('LodestoneUI.FSPickerButton.types.folder')
				: $t('LodestoneUI.FSPickerButton.types.file')
		}
	});

	let hasChosen: boolean = false;

	let uuid = window.crypto.randomUUID();

	function _onChosen(event: Event): void {
		hasChosen = true;

		onChosen(event);
	}
</script>

<!-- svelte complains that it cannot have role, it can... or atleast Windows Narrator correctly sees it. -->
<label
	for="filePicker-{uuid}"
	role="button"
	tabindex="0"
	aria-label={`${text}: ${hasChosen ? $t('LodestoneUI.FSPickerButton.ariaLabel.chosen', { values: { type: folder ? $t('LodestoneUI.FSPickerButton.types.folder') : $t('LodestoneUI.FSPickerButton.types.file') } }) : $t('LodestoneUI.FSPickerButton.ariaLabel.notChosen')}`}
	class:filePicker={true}
	class:chosen={hasChosen}
	bind:this={label}
	{...$$props}
>
	{text}
</label>

<input
	type="file"
	class="fileInput"
	id="filePicker-{uuid}"
	bind:this={picker}
	on:change={_onChosen}
	{multiple}
	webkitdirectory={folder}
/>

<style>
	.filePicker {
		color: var(--text);
		background-color: var(--bg-alt);
		padding: 10px;
		border-radius: 10px;
		will-change: filter;
		transition:
			filter 200ms,
			border-color 100ms;
		border: 1px solid var(--bg-border);
		cursor: pointer;
		border-color: var(--accent);
	}

	.filePicker:hover {
		filter: drop-shadow(0 0 0.5em var(--accent));
		border: 1px solid var(--accent);
	}

	.chosen {
		filter: drop-shadow(0 0 0.3em rgba(0, 200, 0));
		border: 1px solid rgba(0, 200, 0);
	}

	.fileInput {
		display: none;
	}
</style>
