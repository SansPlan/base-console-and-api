<script setup lang="ts">
import LayoutAside from '@/components/LayoutAside.vue'
import LayoutTopBar from '@/components/LayoutTopBar.vue'
import { useAppConfig } from '@/stores/useAppConfig'

const appConfig = useAppConfig()
</script>

<template>
  <n-layout class="h-screen">
    <n-layout-header bordered class="h-header">
      <LayoutTopBar />
    </n-layout-header>
    <n-layout position="absolute" class="!top-[var(--oi-navbar-height)]" has-sider>
      <n-layout-sider
        v-if="!appConfig.isHomePage"
        bordered
        v-model:collapsed="appConfig.collapse"
        :native-scrollbar="false"
        :width="appConfig.sidebarExpandWidth"
        collapse-mode="width"
        :show-trigger="false"
        :collapsed-width="appConfig.sidebarCollapseWidth"
        :collapsed-trigger-style="appConfig.sidebarTriggerStyle"
        :trigger-style="appConfig.sidebarTriggerStyle"
        content-class="py-1.5"
        class="hidden lg:flex"
      >
        <LayoutAside />
      </n-layout-sider>
      <n-layout-content :naive-scrollbar="false" embedded :native-scrollbar="false">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">
.page-enter-active,
.page-leave-active {
  @apply transition duration-300;
}

.page-enter-from,
.page-leave-to {
  @apply -translate-y-4 opacity-0;
}
</style>
