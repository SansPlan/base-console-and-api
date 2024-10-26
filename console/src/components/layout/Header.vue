<script setup lang="ts">
import { LearnOnceLogo } from '../learn-once'
import AccountPopover from '../AccountPopover.vue'
import AppNotification from '../AppNotification.vue'
import AppConfig from '../AppIndividualization.vue'
import { MenubarToggle, MenubarDrawer } from '.'

import { useAppConfig } from '@/stores/useAppConfig'

const { siteName, isHomePage } = useAppConfig()
</script>

<template>
  <n-layout-header bordered class="h-header">
    <header class="flex items-center h-full gap-1 px-3 mx-auto container-full">
      <router-link to="/" class="flex items-center flex-shrink-0 gap-1 font-semibold">
        <LearnOnceLogo :size="20" class="dark:text-white" />
        <span class="mx-0.5 -mt-0.5 text-sm">{{ siteName }}</span>
      </router-link>

      <div class="flex items-center px-2">
        <MenubarToggle v-if="!isHomePage()" />
        <template v-else>
          <router-link to="/dashboard" class="hidden lg:inline">
            <n-button quaternary circle>
              <Icon icon="mage:dashboard-2" width="18" />
            </n-button>
          </router-link>
        </template>
      </div>

      <MenubarDrawer />

      <span class="ml-auto" />

      <AppNotification />
      <AppConfig />

      <n-divider vertical />
      <AccountPopover />
    </header>
  </n-layout-header>
</template>
