<script setup lang="ts">
import { useAppConfig } from '@/stores/useAppConfig'

const appConfig = useAppConfig()
</script>

<template>
  <n-button quaternary @click="appConfig.toggleCollapse" circle class="hidden lg:inline-flex">
    <transition name="fade">
      <Icon v-if="appConfig.collapse" icon="fluent:pane-close-24-regular" width="20" />
      <Icon v-else icon="fluent:pane-open-24-regular" width="20" />
    </transition>
  </n-button>
</template>
