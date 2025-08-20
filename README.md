# slidev-theme-ekino

This is a [Slidev](https://sli.dev) theme following the guidelines of ekino's "Identity" guide.

This is basically a copy of ekino's Powerpoint template, but for Slidev.

Contributions are welcome ! 🤓

[![NPM](https://nodei.co/npm/@ekino/slidev-theme-ekino.svg)](https://www.npmjs.com/package/@ekino/slidev-theme-ekino)

## Usage

1. Create a Slidev project following [the docs](https://sli.dev/guide/).

2. Install the `@ekino/slidev-theme-ekino` dependency:

```
pnpm install @ekino/slidev-theme-ekino
```

3. Use it as your theme in `slides.md`:

```md
---
theme: "@ekino/slidev-theme-ekino"
# ...
---
```

### Available layouts

#### `layout: default`

The default layout of any Slidev slide.

#### `layout: cover`

The default layout of the first slide.

#### `layout: title`

The layout for almost all-yellow slides with bold centered title.

#### `layout: thank_you`

The layout to end your presentation.

##### `layout: thank_you` `::speaker::`

This layout provides an optional `speaker` placeholder, located at the bottom right of the slide.

You can use the `<SpeakerCard>` component to fill it.

```md
---
layout: thank_you
---

::speaker::

<SpeakerCard name="Maxime Dubourg" title="Ingénieur Front-end Sénior">
  <p>📬 maxime.dubourg@ekino.com</p>
  <p>📞 +33 1 23 45 67 89</p>
</SpeakerCard>

```

### Available components

#### `<SpeakerCard>`

A component to display a speaker's name, title and contact information. Useful for cover slide for example. Also particularly well-suited for the `speaker` slot in the `thank_you` layout.

```md
<SpeakerCard name="Maxime Dubourg" title="Ingénieur Front-end Sénior">
  <p>📬 maxime.dubourg@ekino.com</p>
  <p>📞 +33 1 23 45 67 89</p>
</SpeakerCard>
```

## Contributing

Thank you for considering contributing to this project!

To begin, just clone the project locally. Once you're set and ready to merge your changes, create a new Pull Request targeting the `master` branch for review.

### Publishing a new version to npm registry

1. Bump the `version` field in `package.json`

2. Commit the changes and push it to `master`

3. Run `pnpm publish`
