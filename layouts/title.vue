<script setup lang="ts">
import { ref } from "vue";
import MainLayout from "../components/main-layout.vue";
import { DISPLAY_SIZES, useFitTitle } from "../utils/fit-title";

defineProps<{
  /** Part number, e.g. "01" (displayed as ".01") */
  number?: string | number;
  /** Optional portrait image (apply the ekino grain to it beforehand) */
  image?: string;
}>();

const bottom = ref<HTMLElement>();
// T1 by default, never smaller than T4
useFitTitle(bottom, "h1", DISPLAY_SIZES.slice(0, 4));
</script>

<template>
  <MainLayout name="title" theme="dark" copyright-position="middle">
    <img v-if="image" class="ek-title-image" :src="image" alt="" />

    <div ref="bottom" class="ek-bottom">
      <slot />
    </div>

    <p v-if="number !== undefined" class="ek-title-number">.{{ number }}</p>
  </MainLayout>
</template>
