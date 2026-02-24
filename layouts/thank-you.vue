<script setup>
import MainLayout from "../components/main-layout.vue";
</script>

<template>
  <MainLayout hidePageAndTitle name="thank-you" extraClasses="bg-[#FFD900]">
    <div class="w-full z-10 absolute top-30 left-0 flex justify-center">
      <div class="border border-white rounded-full w-80 h-80"></div>
    </div>
    <div
      class="absolute h-full flex items-center text-6xl text-nowrap gap-x-6 z-20 top-0"
    >
      <p>Thank you.</p>
      <p>Merci.</p>
      <p>謝謝.</p>
      <p>dhanya</p>
    </div>

    <slot />

    <div v-if="$slots.speaker" class="absolute bottom-16 right-16">
      <slot name="speaker" />
    </div>

  </MainLayout>
</template>
