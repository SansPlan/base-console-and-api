<script setup lang="ts">
import { Header, TabBar, Menubar } from '@/components/layout'
import { useAppConfig } from '@/stores/useAppConfig'

const appConfig = useAppConfig()
</script>

<template>
  <n-layout class="h-screen">
    <Header />
    <n-layout has-sider position="absolute" class="!top-[var(--learn-header-height)]">
      <n-layout-sider
        v-if="!appConfig.isHomePage()"
        bordered
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
      <n-layout-content :naive-scrollbar="false" embedded :native-scrollbar="false">
        <transition name="fade">
          <TabBar v-if="appConfig.showTabBar" />
        </transition>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <transition name="page" mode="out-in">
              <component :is="Component" :data-tabbar="appConfig.showTabBar" />
            </transition>
          </keep-alive>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
