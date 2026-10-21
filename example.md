---
theme: ./
transition: slide-left
title: ekino - Template Slidev
themeConfig:
  project: Template Slidev
  confidential: true
  date: Octobre 2026
layout: cover
---

# Template Slidev

Des présentations Slidev dans le design system ekino

---
layout: toc
---

# Sommaire

1. Le design system
   - Typographie, couleurs, fonds
2. Les layouts
   - Contenu, colonnes, pages de titre
3. Les composants
   - Speaker, feedback

---
layout: title
number: "01"
image: https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800
---

# Partie

Une phrase de cadrage qui situe la partie.

---
eyebrow: Design system
---

# Une slide = une idée, le titre dit le message

## Le titre d'une slide de contenu est un sous-titre en casse de phrase

- La couleur de référence est le noir de marque, l'accent signale **une seule** information.
- Le corps de texte est en PP Neue Corp Normal, 12 pt.
- Les titres display en capitales sont réservés aux pages de titre et aux chiffres clés.
- Pas de tiret long, pas de point médian, « ekino » toujours en bas de casse.

---
layout: two-cols
eyebrow: Design system
---

# Toute photo de propos porte le grain ekino

Le composant `<EkinoImage>` applique la trame du site ekino.fr. L'image arrive en grain noir et blanc, puis sa version couleur se révèle trois secondes après l'arrivée de la slide.

Jamais de grain sur une photo de profil, une capture d'écran ou un logo.

::right::

<EkinoImage src="https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=1600" alt="Une ville vue d'en haut" />

---
eyebrow: Design system
source: documentation Slidev
---

# Le code reste lisible, en monochrome

Les blocs de code sont la seule tolérance pour une police mono : on les traite comme une capture d'outil.

```ts
export function greet(name: string): string {
  // Une seule information en accent par slide
  return `Bonjour ${name}`
}
```

```bash
pnpm i @ekino/slidev-theme-ekino
```

---
layout: two-cols
eyebrow: Layouts
---

# Texte à gauche, contenu à droite

La composition 5/7 du masque : une colonne de texte, un filet vertical, une colonne de contenu.

::left::

Le titre et le texte vivent dans la colonne de gauche.

::right::

| Layout | Fond | Usage |
| --- | --- | --- |
| `cover` | noir | ouverture du deck |
| `toc` | gris | sommaire |
| `title` | noir | intercalaire de partie |
| `default` | blanc | contenu |
| `two-cols` | blanc | texte et contenu |
| `center` | blanc | message centré |
| `quote` | noir | verbatim |
| `point` | blanc, disque noir | transition « le point » |
| `thank-you` | noir | fin de deck |

---
layout: center
eyebrow: Layouts
---

# Un message centré

Pour une emphase ou un message clé.

---
layout: quote
author: Prénom Nom
role: Nom du poste
---

La couleur signale et ne décore pas : **une information mise en avant** par slide, pas plus.

---
layout: point
---

Nos ingénieurs, votre projet.

---
layout: title
number: "02"
---

# Questions

---
layout: thank-you
---

<div class="absolute right-[19px] bottom-[60px]">
  <Feedback size="small" url="https://openfeedback.io/" text="Votre avis compte" />
</div>

::speaker::

<SpeakerCard name="Maxime Dubourg" title="Ingénieur Front-end Sénior">
  <p>maxime.dubourg@ekino.com</p>
  <p>+33 1 23 45 67 89</p>
</SpeakerCard>
