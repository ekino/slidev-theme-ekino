<script setup>
import MainLayout from "../components/main-layout.vue";
</script>

<template>
  <MainLayout name="center">
    <div class="flex flex-col items-center justify-center h-full">
      <slot />
    </div>
  </MainLayout>
</template>
