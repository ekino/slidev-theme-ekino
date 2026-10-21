<script setup lang="ts">
import { computed, ref } from "vue";
import MainLayout from "../components/main-layout.vue";
import EkinoImage from "../components/ekino-image.vue";
import { DISPLAY_SIZES, useFitTitle } from "../utils/fit-title";

const props = defineProps<{
  /** Part number, e.g. "01" (displayed as ".01") */
  number?: string | number;
  /** Optional portrait image, the ekino grain is applied to it */
  image?: string;
}>();

// YAML reads an unquoted `number: 01` as 1: always two digits
const partNumber = computed(() =>
  typeof props.number === "number"
    ? String(props.number).padStart(2, "0")
    : props.number,
);

const bottom = ref<HTMLElement>();
// T1 by default, never smaller than T4
useFitTitle(bottom, "h1", DISPLAY_SIZES.slice(0, 4));
</script>

<template>
  <MainLayout name="title" theme="dark" copyright-position="middle">
    <EkinoImage v-if="image" class="ek-title-image" :src="image" />

    <div ref="bottom" class="ek-bottom">
      <slot />
    </div>

    <p v-if="partNumber !== undefined" class="ek-title-number">.{{ partNumber }}</p>
  </MainLayout>
</template>
