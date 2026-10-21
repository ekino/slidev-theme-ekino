<script setup lang="ts">
import MainLayout from "../components/main-layout.vue";

defineProps<{
  eyebrow?: string;
  source?: string;
}>();
</script>

<template>
  <MainLayout name="two-cols" :source="source">
    <div class="ek-col-left">
      <p class="ek-eyebrow">{{ eyebrow }}</p>
      <slot />
      <div v-if="$slots.left" class="ek-col-slot">
        <slot name="left" />
      </div>
    </div>

    <div aria-hidden="true" class="ek-col-rule"></div>

    <div class="ek-col-right">
      <slot name="right" />
    </div>
  </MainLayout>
</template>
