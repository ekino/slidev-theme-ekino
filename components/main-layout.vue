<script setup lang="ts">
import EkinoLogo from "./ekino-logo.vue";

const props = defineProps<{
  name?: string;
  hidePageAndTitle?: boolean;
  extraClasses?: string;
}>();
</script>

<template>
  <div :class="['slidev-layout relative', name, extraClasses]">
    <EkinoLogo class="fixed top-7 left-0 -rotate-90" width="50px" />

    <p
      v-if="!hidePageAndTitle || name === 'thank_you'"
      class="fixed bottom-7 left-9 origin-bottom-left -rotate-90 !m-0 text-2"
    >
      {{ $slidev.configs.title }}
    </p>

    <slot />

    <div
      v-if="!hidePageAndTitle"
      class="fixed top-1/2 right-0 flex gap-x-2 items-center -translate-y-1/2"
      :aria-label="`Numéro de diapositive : ${$page}`"
    >
      <p class="text-2">{{ $page }}</p>
      <div aria-hidden="true" class="w-4 h-px bg-stone -translate-y-px"></div>
    </div>

    <div
      v-if="!hidePageAndTitle"
      aria-hidden="true"
      class="bg-[#FFD900] rounded-full w-7 h-7 fixed bottom-6 -right-2"
    ></div>
  </div>
</template>
