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
  <div :class="['ek-speaker-card', extraClasses]">
    <p class="ek-speaker-card__name">{{ name }}</p>
    <p v-if="title" class="ek-speaker-card__title">{{ title }}</p>
    <p v-if="email" class="ek-speaker-card__details">{{ email }}</p>
    <div v-if="$slots.default" class="ek-speaker-card__details">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ek-speaker-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ek-speaker-card p {
  margin: 0;
}

/* Petit sous-titre */
.ek-speaker-card__name {
  font-size: var(--ek-st2);
  font-weight: 600;
  line-height: 1.1;
}

/* Légende */
.ek-speaker-card__title,
.ek-speaker-card__details {
  font-size: var(--ek-c3);
  line-height: 1.3;
  color: var(--ek-muted);
}

.ek-speaker-card__details :deep(p) {
  margin: 0;
}
</style>
