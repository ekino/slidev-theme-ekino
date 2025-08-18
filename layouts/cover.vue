<script setup>
import MainLayout from "../components/main-layout.vue";
</script>

<template>
  <MainLayout name="cover" hide-page-and-title>
    <div class="max-w-3/4">
      <slot />
    </div>

    <div
      aria-hidden="true"
      class="bg-[#FFD900] rounded-full h-[120%] aspect-ratio-square fixed -bottom-[10%] right-0 translate-x-[65%] -z-1"
    >
      <EkinoLogo
        class="absolute top-1/2 -translate-y-1/2 left-8"
        width="150px"
      />
    </div>
    <div
      aria-hidden="true"
      class="bg-black opacity-10 rounded-full w-50 aspect-ratio-square fixed -bottom-22 right-10"
    ></div>
    <div
      aria-hidden="true"
      class="fixed w-12 top-1/2 right-0 h-px bg-stone -translate-y-px"
    ></div>
  </MainLayout>
</template>
