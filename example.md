---
theme: ./
transition: slide-left
title: Ekino - Template Slidev
highlighter: shiki
layout: cover
---

# ekino - Slidev template

<br />

_Create Slidev presentations using ekino's visual identity_

<br />
<br />


<SpeakerCard name="Maxime Dubourg" title="Ingénieur Front-end Sénior">
  <p>maxime.dubourg@ekino.com</p>
  <p>+33 1 23 45 67 89</p>
</SpeakerCard>

::logo::

<img width="100px" src="https://sli.dev/logo.svg" />

---

# Main title

- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
- Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
- Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
- Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt moll

---

# Main title again

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<br />

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

```bash
pnpm i @ekino/slidev-theme-ekino
```

---
layout: title
---

# Slide with title layout

---
layout: two-cols
---

# This spans on the top

::left::

# Left

This shows on the left

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

::right::

# Right

This shows on the right

![](https://placehold.co/600x400)

---
layout: center
---

# Centered Content

This content is centered on the slide.

Perfect for emphasis or key messages.

---
layout: thank-you
---

<div class="absolute bottom-10 left-10">
  <Feedback size="small" url="https://openfeedback.io/" text="Write here anything" />
</div>

::speaker::

<SpeakerCard name="Maxime Dubourg" title="Ingénieur Front-end Sénior">
  <p>📬 maxime.dubourg@ekino.com</p>
  <p>📞 +33 1 23 45 67 89</p>
</SpeakerCard>
