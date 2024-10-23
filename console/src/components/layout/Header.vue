<script setup lang="ts">
import WebLogo from '../WebLogo.vue'
import AccountPopover from '../AccountPopover.vue'
import AppNotification from '../AppNotification.vue'
import AppConfig from '../AppConfig.vue'
import { MenubarToggle, MenubarDrawer } from '.'

import { useAppConfig } from '@/stores/useAppConfig'

const appConfig = useAppConfig()
</script>

<template>
  <n-layout-header bordered class="h-header">
    <header class="flex items-center h-full gap-3 px-3 mx-auto container-full">
      <router-link to="/" class="flex items-center flex-shrink-0 gap-1 font-semibold">
        <WebLogo :size="20" />
        <span class="mx-0.5 -mt-0.5 text-sm">{{ appConfig.siteName }}</span>
      </router-link>

      <MenubarToggle v-if="!appConfig.isHomePage()" />
      <template v-else>
        <router-link to="/dashboard" class="hidden lg:inline">
          <n-button quaternary circle>
            <Icon icon="mage:dashboard-2" width="18" />
          </n-button>
        </router-link>
      </template>

      <MenubarDrawer />

      <span class="ml-auto" />

      <AppNotification />
      <AppConfig />

      <n-divider vertical />

      <AccountPopover />
    </header>
  </n-layout-header>
</template>
