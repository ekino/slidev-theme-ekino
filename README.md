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

The layout accepts an optional `::logo::` slot. If not provided, the default ekino logo will be displayed.

```md
---
layout: cover
---

# ekino - Slidev template

_Create Slidev presentations using ekino's visual identity_

::logo::

<img width="100px" src="https://sli.dev/logo.svg" />
```

#### `layout: title`

The layout for almost all-yellow slides with bold centered title.

#### `layout: two-cols`

A layout with two columns, providing two optional `::left::` and `::right::` slots.

```md
---
layout: two-cols
---

# This takes the full width

::left::

## Left

This shows on the left

::right::

## Right

This shows on the right
```

#### `layout: center`

A layout that centers the content both horizontally and vertically on the slide.

```md
---
layout: center
---

# Centered Content

This content is centered on the slide.
```

#### `layout: thank-you`

The layout to end your presentation.

This layout provides an optional `::speaker::` slot, located at the bottom right of the slide.

You can use the `<SpeakerCard>` component to fill it.

```md
---
layout: thank-you
---

::speaker::

<SpeakerCard name="Maxime Dubourg" title="Ingénieur Front-end Sénior">
  <p>📬 maxime.dubourg@ekino.com</p>
  <p>📞 +33 1 23 45 67 89</p>
</SpeakerCard>

```

### Available components

#### `<SpeakerCard>`

A component to display a speaker's name, title and contact information. Useful for cover slide for example. Also particularly well-suited for the `speaker` slot in the `thank-you` layout.

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
