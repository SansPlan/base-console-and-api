<script setup lang="ts">
import { useAppConfig } from '@/stores/useAppConfig'
import TabBarItem from './TabBarItem.vue'

const route = useRoute()
const router = useRouter()
const appConfig = useAppConfig()

function handleCloseIndex(index: number) {
  appConfig.removeTabItem(index)
  const currentItem = appConfig.tabBarItems[appConfig.currentTabIndex]
  if (currentItem.to.name !== route.name) {
    router.push(currentItem.to)
  }
}
</script>

<template>
  <div class="sticky inset-x-0 top-0 hidden px-1 bg-white border-b h-navbar border-zinc-100 lg:block">
    <div class="flex items-center">
      <n-button circle size="small">
        <Icon icon="uiw:left" />
      </n-button>
      <n-scrollbar x-scrollbar content-class="px-2">
        <div class="flex items-center gap-1 h-navbar">
          <TabBarItem
            v-for="(item, index) in appConfig.tabBarItems"
            :key="item.label"
            :tab="item"
            :no-closable="item.to.name.includes('welcome')"
            :is-active="index === appConfig.currentTabIndex"
            @close="handleCloseIndex(index)"
          />
        </div>
      </n-scrollbar>
      <n-button circle size="small">
        <Icon icon="uiw:right" />
      </n-button>
    </div>
  </div>
</template>
