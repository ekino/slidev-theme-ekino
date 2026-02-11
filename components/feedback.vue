<script setup lang="ts">
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'

const props = defineProps<{
  url: string
  size?: 'small' | 'medium' | 'large'
}>()

const qrSize = computed(() => {
  switch (props.size) {
    case 'small': return 100
    case 'large': return 300
    default: return 200
  }
})

const textClass = computed(() => {
  switch (props.size) {
    case 'small': return 'text-sm'
    case 'large': return 'text-xl'
    default: return 'text-lg'
  }
})
</script>

<template>
  <div class="feedback-component flex flex-col items-center justify-center">
    <QrcodeVue :value="url" :size="qrSize" level="H" />
    <p :class="['text-center mt-4', textClass]">Give me a feedback / Donnez votre avis</p>
  </div>
</template>
