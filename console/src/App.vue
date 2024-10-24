<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
import { useThemeColor } from '@/composables/useThemeColor'

const { theme, themeOverrides } = useThemeColor()
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="theme" :theme-overrides="themeOverrides">
    <RouterView />
  </n-config-provider>
</template>
