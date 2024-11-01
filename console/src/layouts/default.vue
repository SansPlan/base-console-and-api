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
        class="hidden lg:flex"
      >
        <Menubar />
      </n-layout-sider>
      <n-layout-content :native-scrollbar="false">
        <TabBar v-if="appConfig.showTabBar" />
        <router-view v-slot="{ Component, route }">
          <keep-alive :include="getKeepAliveInclude">
            <component :is="Component" :key="route.fullPath" :data-tabbar="appConfig.showTabBar" />
          </keep-alive>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
