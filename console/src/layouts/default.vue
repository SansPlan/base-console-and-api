<script setup lang="ts">
import { Header, TabBar, Menubar } from '@/components/layout'
import { useAppConfig } from '@/stores/useAppConfig'

const appConfig = useAppConfig()

const getKeepAliveInclude = computed<string[]>(() => appConfig.tabBarItems.filter(item => item && item.keepAlive).map(item => item.name as string))
</script>

<template>
  <n-layout class="h-screen">
    <Header />
    <n-layout has-sider position="absolute" class="!top-[var(--site-header-height)]">
      <n-layout-sider
        v-model:collapsed="appConfig.collapse"
        :native-scrollbar="false"
        :width="appConfig.menubarExpandWidth"
        collapse-mode="width"
        :show-trigger="false"
        :collapsed-width="appConfig.menubarCollapseWidth"
        :collapsed-trigger-style="appConfig.menubarTriggerStyle"
        :trigger-style="appConfig.menubarTriggerStyle"
        content-class="py-1.5"
        class="hidden lg:flex z-[2]"
        bordered
        style="--tw-shadow: 0 0 12px 8px rgba(0 0 0 / 0.05)"
      >
        <Menubar />
      </n-layout-sider>
      <n-layout-content :native-scrollbar="false">
        <TabBar v-if="appConfig.showTabBar" />
        <router-view v-slot="{ Component, route }">
          <div v-if="appConfig.refreshTabPage" :class="appConfig.showTabBar ? 'h-pageHeight2' : 'h-pageHeight'">
            <div class="h-full bg-gradient-to-r from-teal-100 to-indigo-100" />
          </div>
          <keep-alive v-else :include="getKeepAliveInclude">
            <component :is="Component" :key="route.fullPath" :data-tabbar="appConfig.showTabBar" />
          </keep-alive>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
