/*  Lodestone UI | Library of UI components used by Project Lodestone
 *  Copyright (C) 2025 Team Lodestone
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301
 *  USA
 */

import { addMessages, init } from 'svelte-i18n';

/** Call this when languages are initialized in the dependent.
 *
 * Unfortunately I cannot find an easy way around forcing a second init.
 *
 * @param options passed to init which takes ConfigureOptionsInit, but it's not exported, so I have to use type `any`.
 */
export async function initLUILanguages(options: never) {
	// add languages
	addMessages('en-US', (await import('./L10N/en-us.json')) as never);
	addMessages('fr', (await import('./L10N/fr.json')) as never);
	addMessages('ru', (await import('./L10N/ru.json')) as never);
	addMessages('nl', (await import('./L10N/nl.json')) as never);

	// wish I didn't have to init here... I wanted to leave it up to the dependent to initialize svelte-i18n
	await init(options);
}

export { default as Topbar } from './Components/Topbar.svelte';
export { default as Dialog } from './Components/Dialog.svelte';
export { default as ButtonLink } from './Components/ButtonLink.svelte';
export { default as Footer } from './Components/Footer.svelte';
export { default as ProgressBar } from './Components/ProgressBar.svelte';
export { default as InfoCard } from './Components/InfoCard.svelte';
export { default as Option } from './Components/Option.svelte';
export { default as ScreenAwareTopbarButton } from './Components/ScreenAwareTopbarButton.svelte';
export { default as Scrollable } from './Components/Scrollable.svelte';
export { default as DropDownBox } from './Components/DropDownBox.svelte';
export { default as Tooltip } from './Components/Tooltip.svelte';
export { default as SlideUp } from './Components/SlideUp.svelte';
export { default as FSPickerButton } from './Components/FSPickerButton.svelte';
