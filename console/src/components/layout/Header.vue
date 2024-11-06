<script setup lang="ts">
import { SLogo } from '../uninportance'
import AccountPopover from '../AccountPopover.vue'
import AppNotification from '../AppNotification.vue'
import AppIndividualization from '../AppIndividualization.vue'
import { AppSearch } from '../app-search'
import { MenubarToggle, MenubarDrawer } from '.'

import { useAppConfig } from '@/stores/useAppConfig'

const appConfig = useAppConfig()
</script>

<template>
  <n-layout-header class="relative z-10 h-header" bordered>
    <header class="flex items-center h-full gap-1 px-3 mx-auto container-full">
      <router-link to="/" class="flex items-center flex-shrink-0 gap-0.5 text-zinc-950">
        <SLogo :size="19" class="dark:text-white" />
        <span class="mx-0.5 -mt-0.5 text-base font-semibold">{{ appConfig.siteName }}</span>
      </router-link>

      <div class="flex items-center mx-2">
        <MenubarToggle v-if="!appConfig.isHomePage()" />
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

      <AppSearch />
      <AppNotification />
      <AppIndividualization />

      <n-divider vertical />
      <AccountPopover />
    </header>
  </n-layout-header>
</template>
