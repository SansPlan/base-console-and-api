<script setup lang="ts">
// import { theme, swatches, setThemeColor } from '@/lib/naive-ui'
import { useThemeColor } from '@/composables/useThemeColor'

const { themeOverrides, swatches, setThemeColor, syncThemeOverrides } = useThemeColor()

function renderLabel(color: string | null) {
  return h('span')
}
</script>

<template>
  <div class="flex items-center gap-3">
    <n-color-picker :value="themeOverrides?.common?.primaryColor" :swatches="swatches" @update-value="setThemeColor" :render-label="renderLabel" />
    <n-button quaternary @click="syncThemeOverrides">重置</n-button>
  </div>
</template>
