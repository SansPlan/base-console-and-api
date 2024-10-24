<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
import { useThemeColor } from '@/composables/useThemeColor'

const { theme, themeOverrides } = useThemeColor()
watch(
  themeOverrides,
  () => {
    console.log('ThemeOverrides Changed: ', themeOverrides.value)
  },
  { deep: true },
)
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides" :theme="theme">
    <RouterView />
  </n-config-provider>
</template>
