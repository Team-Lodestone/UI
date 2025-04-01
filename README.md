# UI

Library of UI components used by Project Lodestone.

> [!NOTE]
> Some parts of this package may rely on styles and/or other components that are only present in official Project Lodestone packages.
>
> Don't worry, external support will be worked on, but is not the main focus at the moment.

To install:
`npm install @team-lodestone/lodestone-ui`

Then, before the page is rendered, initialize svelte-i18n.
ex:

```ts
import { initLUILanguages } from "@team-lodestone/lodestone-ui";
import { getLocaleFromNavigator } from 'svelte-i18n';

let app: { $set?: any, $on?: any } | undefined = undefined;

async function initApp() {
	// wish this would get inited just by `init` being called from the dependent instead of a seperate function.
	await initLUILanguages({
		fallbackLocale: 'en-US',
		initialLocale: getLocaleFromNavigator(),
		warnOnMissingMessages: true
	});

	// it's loaded, now we can mount.
	return mount(App, {
		target: document.getElementById('app')!,
	})
}

initApp().then((mounted) => {
	app = mounted;
});

export default app;
```

> [!IMPORTANT]
> If you see missing icons, you'll need to include the CSS for FontAwesome and Bootstrap Icons

### Translating

See [CONTRIBUTING.md](/CONTRIBUTING.md)

Translations can be overridden, just override the exact key(s) that you want to use a different translation for.  
This is why all translations are under the `LodestoneUI` namespace

### Credits

Some icons come from Bootstrap Icons and FontAwesome

### Legal
Project Lodestone is not an official Minecraft product.
