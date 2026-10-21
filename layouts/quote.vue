<script setup lang="ts">
import MainLayout from "../components/main-layout.vue";

defineProps<{
  author?: string;
  /** Author's job title */
  role?: string;
  source?: string;
}>();
</script>

<template>
  <MainLayout name="quote" theme="dark" :source="source">
    <!-- Guillemet du masque (Citation_Black) -->
    <svg
      class="ek-quote-mark"
      aria-hidden="true"
      viewBox="0 0 104 49"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M104 49 55.2695 49 55.2695 23.1717C55.2695 10.0361 67.0239 0 97.7725 0L103.299 0 103.299 12.1762 99.7964 12.1762C85.1617 12.1762 79.3233 17.1205 79.3233 22.6551L104 22.6551 104 49ZM48.7305 49 0 49 0 23.1717C0 10.0361 11.7545 0 42.503 0L48.0299 0 48.0299 12.1762 44.5269 12.1762C29.8922 12.1762 24.0539 17.1205 24.0539 22.6551L48.7305 22.6551 48.7305 49Z"
      />
    </svg>

    <div class="ek-quote-body">
      <div class="ek-quote-text">
        <slot />
      </div>
      <p v-if="author || role" class="ek-quote-author">
        <span v-if="author">{{ author }}</span>
        <br v-if="author && role" />
        <span v-if="role" class="ek-muted">{{ role }}</span>
      </p>
    </div>
  </MainLayout>
</template>
