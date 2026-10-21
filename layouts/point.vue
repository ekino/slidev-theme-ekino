<script setup lang="ts">
import { computed } from "vue";
import { useIsSlideActive, useSlideContext } from "@slidev/client";
import MainLayout from "../components/main-layout.vue";

const isActive = useIsSlideActive();
const { $renderContext } = useSlideContext();

// The disc grows when the slide is shown; exports and overviews get the final state.
const idle = computed(
  () => $renderContext.value === "slide" && !isActive.value,
);
</script>

<template>
  <MainLayout name="point" :extra-classes="idle ? 'ek-point--idle' : ''">
    <!-- Above the chrome, like the disc of the masque -->
    <div aria-hidden="true" class="ek-point-disc"></div>
    <div class="ek-point-text">
      <slot />
    </div>
  </MainLayout>
</template>
