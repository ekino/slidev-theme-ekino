<script setup lang="ts">
import MainLayout from "../components/main-layout.vue";

defineProps<{
  eyebrow?: string;
  source?: string;
}>();
</script>

<template>
  <MainLayout name="center" :source="source">
    <p class="ek-eyebrow">{{ eyebrow }}</p>
    <div class="ek-center">
      <slot />
    </div>
  </MainLayout>
</template>
