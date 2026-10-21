<script setup lang="ts">
import { ref } from "vue";
import MainLayout from "../components/main-layout.vue";
import EkinoBrand from "../components/ekino-brand.vue";
import { useEkinoConfig } from "../utils/theme-config";
import { DISPLAY_SIZES, useFitTitle } from "../utils/fit-title";

const props = withDefaults(
  defineProps<{
    heading?: string;
    /** Overrides `themeConfig.date` */
    date?: string;
  }>(),
  { heading: "Thank you" },
);

const { project, date: configDate } = useEkinoConfig();

const bottom = ref<HTMLElement>();
useFitTitle(bottom, "h1", DISPLAY_SIZES.slice(2, 5));
</script>

<template>
  <MainLayout
    name="thank-you"
    theme="dark"
    :chrome="false"
    copyright-position="middle"
  >
    <EkinoBrand class="ek-brand" />

    <div v-if="$slots.speaker" class="ek-speaker">
      <slot name="speaker" />
    </div>

    <p class="ek-meta">
      <span>{{ $slots.speaker ? "" : project }}</span>
      <span>{{ props.date ?? configDate }}</span>
    </p>

    <slot />

    <div ref="bottom" class="ek-bottom">
      <h1>{{ heading }}</h1>
    </div>
  </MainLayout>
</template>
