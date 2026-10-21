<script setup lang="ts">
import { ref } from "vue";
import MainLayout from "../components/main-layout.vue";
import EkinoBrand from "../components/ekino-brand.vue";
import { useEkinoConfig } from "../utils/theme-config";
import { DISPLAY_SIZES, useFitTitle } from "../utils/fit-title";

const props = defineProps<{
  /** Overrides `themeConfig.date` */
  date?: string;
}>();

const { project, date: configDate } = useEkinoConfig();

const bottom = ref<HTMLElement>();
// T3 by default, never smaller than T5
useFitTitle(bottom, "h1", DISPLAY_SIZES.slice(2, 5));
</script>

<template>
  <MainLayout
    name="cover"
    theme="dark"
    :chrome="false"
    copyright-position="middle"
  >
    <EkinoBrand class="ek-brand" />
    <div v-if="$slots.logo" class="ek-cobrand">
      <slot name="logo" />
    </div>

    <p class="ek-meta">
      <span>{{ project }}</span>
      <span>{{ props.date ?? configDate }}</span>
    </p>

    <div ref="bottom" class="ek-bottom">
      <slot />
    </div>
  </MainLayout>
</template>
