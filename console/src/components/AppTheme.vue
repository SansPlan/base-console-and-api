<script setup lang="ts">
import { theme, swatches, setThemeColor } from '@/lib/naive-ui'

function renderLabel(color: string | null) {
  return h('span')
}
</script>

<template>
  <n-color-picker :default-value="theme?.common?.primaryColor" :swatches="swatches" @update-value="setThemeColor" :render-label="renderLabel" />
</template>
