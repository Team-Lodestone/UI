<!-- only exists so that default styles don't get overridden -->

<progress {...$$props}>
	<slot />
</progress>

<style>
	progress {
		background-color: var(--bg-alt-2) !important;
		border-radius: 5px;
		border: 1px solid var(--bg-border);
	}

	progress::-moz-progress-bar {
		background-image: linear-gradient(
			to right,
			var(--accent-more-saturated),
			var(--accent-saturated),
			var(--accent)
		);
		border-radius: 5px;
		transition: width 200ms;
		border: 1px solid var(--bg-border);
	}

	progress::-webkit-progress-bar {
		background-color: var(--bg-alt-2);
		border-radius: 5px;
	}

	progress::-webkit-progress-value {
		background-image: linear-gradient(
			to right,
			var(--accent-more-saturated),
			var(--accent-saturated),
			var(--accent)
		);
		border-radius: 5px;
		transition: width 200ms;
	}
</style>
