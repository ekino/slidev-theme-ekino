<script setup>
import MainLayout from "../components/main-layout.vue";
</script>

<template>
  <MainLayout name="two-cols">
    <slot />

    <div v-if="$slots.left || $slots.right" class="grid grid-cols-2 gap-x-6">
      <div v-if="$slots.left || $slots.right">
        <slot name="left" />
      </div>

      <div v-if="$slots.right">
        <slot name="right" />
      </div>
    </div>
  </MainLayout>
</template>
