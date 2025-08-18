<script setup>
import MainLayout from "../components/main-layout.vue";
</script>

<template>
  <MainLayout name="title">
    <carbon-arrow-right
      class="absolute top-1/2 -translate-y-1/2 -translate-x-10 opacity-50"
    />

    <slot />

    <div
      aria-hidden="true"
      class="bg-[#FFD900] rounded-full h-[200%] aspect-ratio-square fixed -bottom-[50%] -right-[30%] -z-1"
    ></div>
    <div
      aria-hidden="true"
      class="bg-black opacity-10 rounded-full w-90 aspect-ratio-square fixed -left-24 top-1/2 -translate-y-1/2"
    ></div>
  </MainLayout>
</template>
