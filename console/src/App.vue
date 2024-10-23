<script setup lang="ts">
import { zhCN, dateZhCN, darkTheme, lightTheme } from 'naive-ui'
import { theme } from '@/lib/naive-ui'
import { useAppConfig } from './stores/useAppConfig'
import { useDark, usePreferredDark } from '@vueuse/core'

const appConfig = useAppConfig()
const isPreferredDark = usePreferredDark()
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
})

const getTheme = computed(() => {
  const { themeMode } = appConfig
  if (themeMode === 'system') {
    isDark.value = isPreferredDark.value
    return isDark.value ? darkTheme : lightTheme
  } else {
    isDark.value = themeMode === 'dark'
    return isDark.value ? darkTheme : lightTheme
  }
})
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="theme" :theme="getTheme">
    <RouterView />
  </n-config-provider>
</template>
