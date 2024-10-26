<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
import { useThemeColor } from '@/composables/useThemeColor'

const { theme, themeOverrides } = useThemeColor()
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="theme" :theme-overrides="themeOverrides">
    <n-dialog-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <RouterView />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
