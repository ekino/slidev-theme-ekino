<script setup lang="ts">
import MainLayout from "../components/main-layout.vue";

defineProps<{
  /** Surtitre, above the title */
  eyebrow?: string;
  source?: string;
}>();
</script>

<template>
  <MainLayout name="default" :source="source">
    <p class="ek-eyebrow">{{ eyebrow }}</p>
    <slot />
  </MainLayout>
</template>
