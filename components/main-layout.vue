<script setup lang="ts">
import EkinoLogo from "./ekino-logo.vue";
import { useEkinoConfig } from "../utils/theme-config";

const props = withDefaults(
  defineProps<{
    name?: string;
    /** Slide background: white for content, dark for title pages, grey for the table of contents */
    theme?: "light" | "dark" | "grey";
    /** Shows the logotype, project name, slide number and top rule */
    chrome?: boolean;
    /** Source of the data shown on the slide, bottom left */
    source?: string;
    copyrightPosition?: "right" | "left" | "middle";
    extraClasses?: string;
  }>(),
  {
    theme: "light",
    chrome: true,
    copyrightPosition: "right",
  },
);

const { project, copyright } = useEkinoConfig();
</script>

<template>
  <div
    :class="[
      'slidev-layout ek-layout',
      name,
      { 'ek-dark': theme === 'dark', 'ek-grey': theme === 'grey' },
      extraClasses,
    ]"
  >
    <template v-if="chrome">
      <EkinoLogo class="ek-chrome-logo" />
      <p v-if="project" class="ek-chrome-project">{{ project }}</p>
      <p
        class="ek-chrome-page"
        :aria-label="`Numéro de diapositive : ${$page}`"
      >
        _{{ $page }}
      </p>
      <div aria-hidden="true" class="ek-chrome-rule"></div>
    </template>

    <slot />

    <p v-if="source" class="ek-source">Source : {{ source }}</p>
    <p
      :class="[
        'ek-copyright',
        {
          'ek-copyright--left': copyrightPosition === 'left',
          'ek-copyright--middle': copyrightPosition === 'middle',
        },
      ]"
    >
      {{ copyright }}
    </p>
  </div>
</template>
