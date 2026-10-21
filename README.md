# slidev-theme-ekino

This is a [Slidev](https://sli.dev) theme following ekino's design system (Brand Playbook, September 2026) and its official PowerPoint template ("Masque", October 2026).

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
title: My presentation
themeConfig:
  project: My project # shown at the top of every slide, defaults to `title`
  confidential: true # appends `_[CONFIDENTIAL]` to the project name
  date: Octobre 2026 # shown on the cover and on the last slide
  # copyright: Copyright © 2026 ekino # defaults to the current year
---
```

The theme sets a 1280 × 720 canvas (the geometry of the PowerPoint template): do not override `canvasWidth` nor `fonts.sans`.

### Font installation

The ekino design system uses the **PP Neue Corp** font family by [Pangram Pangram](https://pangrampangram.com/products/neue-corp), which is a commercial font. It is therefore **not distributed with this theme**: installing it is the responsibility of the theme's user.

ekino employees can download it from the ekino Communication SharePoint. Install the three following faces on your computer:

- PP Neue Corp Normal Regular
- PP Neue Corp Normal Semibold
- PP Neue Corp Extended Ultrabold

The theme picks them up automatically from your system fonts. Without them, slides fall back to Helvetica / Arial and will not match the design system.

> Keep this in mind when you build or export a deck (`slidev build`, `slidev export`): the font must be installed on the machine that renders the slides, and a deck deployed as a static website will only display it for viewers who have it installed too.

### What the theme does for you

- **Backgrounds**: dark (`#2B2B2B`) for title pages only (cover, part, quote, end), grey (`#A5A5A5`) for the table of contents, white for every content slide.
- **Chrome** on every content slide: the "ekino." logotype, the project name, the slide number (`_12`), the top rule, and the copyright.
- **Typography**: the title of a content slide (`#`) is a sub-title in sentence case (PP Neue Corp Normal semibold, 28 pt); display titles in Extended Ultrabold capitals are reserved to title pages and key figures, and automatically step down the size scale so they never overflow.
- **Code blocks**: monochrome syntax highlighting, the only place where a monospace font is allowed.

A few rules remain yours: one accented information per slide at most, no emoji, no long dash nor middle dot, "ekino" always in lowercase, images with the ekino grain (see the `ekino-trame` skill).

### Available layouts

| Layout | Background | Use |
| --- | --- | --- |
| `cover` | dark | opening slide |
| `toc` | grey | table of contents |
| `title` | dark | part title page |
| `default` | white | content |
| `two-cols` | white | text on the left, content on the right |
| `center` | white | centered message |
| `quote` | dark | verbatim |
| `point` | white, dark disc | transition, must be followed by a dark slide |
| `thank-you` | dark | end of the deck |

Content layouts (`default`, `two-cols`, `center`) accept two optional frontmatter props:

- `eyebrow`: the small capitalized text above the title, to situate the subject;
- `source`: the source of the data shown on the slide, displayed at the bottom left.

#### `layout: default`

The default layout of any Slidev slide.

```md
---
eyebrow: Context
source: ekino, 2026 survey
---

# The title says the message, in sentence case

## An optional small sub-title

Body text.
```

#### `layout: cover`

The layout of the first slide, with the full ekino brand block. The title is displayed in display capitals at the bottom; a paragraph is displayed above it. The project name and date come from `themeConfig` (`date` can be overridden in the slide frontmatter).

The layout accepts an optional `::logo::` slot, displayed next to the ekino brand block for co-branded presentations.

```md
---
layout: cover
---

# Presentation title

A sub-title

::logo::

<img src="./client-logo.svg" />
```

#### `layout: toc`

The table of contents, on a grey background. Write the parts as an ordered list, with an optional nested list for their sub-titles.

```md
---
layout: toc
---

# Sommaire

1. Part title
   - Part sub-title
2. Another part
```

#### `layout: title`

The part title page ("PARTIE .01"). Provide the part number with `number`, and optionally a portrait `image` (apply the ekino grain to it beforehand). A paragraph is displayed above the title.

```md
---
layout: title
number: "01"
---

# Context

An optional framing sentence.
```

#### `layout: two-cols`

The 5/7 composition of the template: the title and text on the left, a vertical rule, then the `::right::` slot. The optional `::left::` slot is appended below the default content in the left column.

```md
---
layout: two-cols
---

# Text on the left, content on the right

Some text

::right::

![](./chart.png)
```

#### `layout: center`

A layout that centers the content both horizontally and vertically on the slide.

```md
---
layout: center
---

# Centered content

This content is centered on the slide.
```

#### `layout: quote`

A verbatim on a dark background. Text in `**bold**` is highlighted with the accent color.

```md
---
layout: quote
author: Firstname Lastname
role: Job title
---

A short quote, with **one highlighted part**.
```

#### `layout: point`

The "le point" transition: a dark disc grows over the slide, then a sentence of twelve words at most appears. Use it once per deck, and always follow it with a dark slide (`title`, `quote` or `thank-you`).

```md
---
layout: point
---

Nos ingénieurs, votre projet.
```

#### `layout: thank-you`

The layout to end your presentation. The `heading` prop changes the default "Thank you" title.

This layout provides an optional `::speaker::` slot, where you can use the `<SpeakerCard>` component.

```md
---
layout: thank-you
heading: Merci
---

::speaker::

<SpeakerCard name="Maxime Dubourg" title="Ingénieur Front-end Sénior">
  <p>maxime.dubourg@ekino.com</p>
  <p>+33 1 23 45 67 89</p>
</SpeakerCard>
```

### Available components

#### `<SpeakerCard>`

A component to display a speaker's name, title and contact information. Particularly well-suited for the `speaker` slot in the `thank-you` layout.

```md
<SpeakerCard name="Maxime Dubourg" title="Ingénieur Front-end Sénior">
  <p>maxime.dubourg@ekino.com</p>
  <p>+33 1 23 45 67 89</p>
</SpeakerCard>
```

#### `<Feedback>`

A component to display a QR code linking to a feedback form, along with custom text if needed.

```md
<Feedback url="https://example.com/feedback" size="medium" text="Rate my presentation" />
```

**Props:**

- `url` (required): The URL to encode in the QR code for the feedback link
- `size` (optional): The size of the QR code and text. Options: `'small'`, `'medium'` (default), `'large'`
- `text` (optional): A custom text to display below the qrcode

#### `<EkinoLogo>` and `<EkinoBrand>`

The official "ekino." logotype and "ekino. A Havas Company" brand block, as inline SVG in `currentColor`. They are already placed by the layouts: do not use them elsewhere.

### Utility classes

| Class | Use |
| --- | --- |
| `ek-t1` to `ek-t7` | display sizes (Extended Ultrabold capitals), for key figures only |
| `ek-c1`, `ek-c2`, `ek-c3` | body sizes (19, 16 and 13 px) |
| `ek-eyebrow` | small capitalized label |
| `ek-caption` | caption, secondary information |
| `ek-accent` | the accent color, for one information per slide |
| `ek-muted` | secondary text color |

The palette is available as CSS variables: `--ek-grey-dark`, `--ek-grey-line`, `--ek-grey-medium`, `--ek-white`, `--ek-accent`, `--ek-surface`, `--ek-grey-text`, and the accent shades `--ek-accent-90` to `--ek-accent-10` (for charts only).

### Migrating from 2.x

- The yellow (`#FFD900`) and the Graphik font are gone, replaced by the 2026 palette and PP Neue Corp, which is no longer bundled with the theme (see [Font installation](#font-installation)).
- The canvas is now 1280 × 720: absolute positions in your slides may need to be adjusted.
- `cover` and `thank-you` are dark; `title` is now a dark part title page, taking a `number` prop; `thank-you` no longer displays the multilingual "Thank you" text, use the `heading` prop instead.
- `two-cols` now puts the title and the default slot in the left column (5/7 composition).
- New layouts: `toc`, `quote` and `point`. New `themeConfig` options: `project`, `confidential`, `date`, `copyright`.

## Contributing

Thank you for considering contributing to this project!

To begin, just clone the project locally. Once you're set and ready to merge your changes, create a new Pull Request targeting the `master` branch for review.

### Publishing a new version to npm registry

1. Bump the `version` field in `package.json`

2. Commit the changes and push it to `main`

3. Create and push a tag that matches the bumped `version`

4. Create a release with changelog on GitHub

5. Run `pnpm publish`
