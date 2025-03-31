# Contributing

## Translating

> [!NOTE]
> For each missing/empty translation string, there will be a warning in the console.

For translations, the target language of this site is English, so you should base your translations off of that.

under [/src/lib/L10N/](/src/lib/L10N/) there are JSON files for the existing supported languages.  
For adding your own, copy the [en-us.json](/src/lib/L10N/en-us.json) file and rename it with the correct locale code for the targeted language. (e.g Japanese would be `ja.json`)

To have the language work on the site, go to [index.ts](/src/lib/index.ts#L24) and add a new line.  
The line should look like this (using Japanese as an example):
`addMessages('ja', await import('./L10N/ja.json') as never);`

Which boils down to:
`addMessages('language-code', await import('./L10N/language-code.json') as never);`

To find a list of Language Codes using Firefox, go to `about:preferences`, search `language`, and choose `Choose your preferred language for displaying pages`, then find your language and look at the code (in the square brackets)

You can also find the language code of the currently used Navigator language by opening devtools and typing `console.log(navigator.language);`.

After following the [guidelines](#guidelines) and verifying that the translations work correctly, you can make a pull request to submit the translation.

### Guidelines

1. Do not translate "`Project Lodestone`"
2. Do not translate words found within squiggly brackets (`{}`), these are used for formatting.
