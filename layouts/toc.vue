<script setup lang="ts">
import MainLayout from "../components/main-layout.vue";
</script>

<template>
  <MainLayout name="toc" theme="grey" copyright-position="left">
    <slot />
  </MainLayout>
</template>
