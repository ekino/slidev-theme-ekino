<script setup lang="ts">
export type Props = {
  name: string;
  title?: string;
  /**
   * @deprecated use default slot instead
   */
  email?: string;
  extraClasses?: string;
};

defineProps<Props>();
</script>

<template>
  <div
    :class="['flex flex-col pl-2 border-l-2 border-[#FFD900]', extraClasses]"
  >
    <p class="text-lg font-medium">{{ name }}</p>
    <p v-if="title" class="text-sm">{{ title }}</p>
    <p v-if="email" class="text-xs">
      @&nbsp;<span class="underline">{{ email }}</span>
    </p>
    <p v-if="$slots.default" class="text-xs [&>*]:leading-5!">
      <slot />
    </p>
  </div>
</template>
