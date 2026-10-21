<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import MainLayout from "../components/main-layout.vue";
import { useSlideAnimation } from "../utils/slide-animation";

const { isActive, animated } = useSlideAnimation();

// The disc grows when the slide is shown; exports and overviews get the final state.
const idle = ref(animated.value && !isActive.value);
let frame: number | undefined;

watch([isActive, animated], ([active, anim]) => {
  if (frame !== undefined) cancelAnimationFrame(frame);
  if (!anim) {
    idle.value = false;
    return;
  }
  // Leaving: the disc stays while the slide transitions out
  if (!active) return;
  // Entering: back to the empty state, then grow once it has been painted
  idle.value = true;
  frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => (idle.value = false));
  });
});

onBeforeUnmount(() => {
  if (frame !== undefined) cancelAnimationFrame(frame);
});
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
