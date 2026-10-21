<script setup lang="ts">
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'

const props = withDefaults(defineProps<{
  url: string
  size?: 'small' | 'medium' | 'large'
  text?: string
}>(), {
  text: 'Give me a feedback'
})

const qrSize = computed(() => {
  switch (props.size) {
    case 'small': return 100
    case 'large': return 300
    default: return 200
  }
})

const textClass = computed(() => {
  switch (props.size) {
    case 'small': return 'ek-c3'
    case 'large': return 'ek-c1'
    default: return 'ek-c2'
  }
})
</script>

<template>
  <div class="feedback-component flex flex-col items-center justify-center">
    <!-- Quiet zone in white so the code stays readable on dark slides -->
    <QrcodeVue :value="props.url" :size="qrSize" level="H" :margin="2" foreground="#2b2b2b" background="#ffffff" />
    <p v-if="props.text" :class="['text-center mt-4', textClass]">{{ props.text }}</p>
  </div>
</template>
