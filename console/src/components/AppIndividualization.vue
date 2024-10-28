<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import AppTheme from './AppTheme.vue'
import { useAppConfig } from '@/stores/useAppConfig'
import { useThemeColor } from '@/composables/useThemeColor'

const appConfig = useAppConfig()
const { themeMode, theme } = useThemeColor()

const showConfig = ref<boolean>(false)
const toggleShowConfig = useToggle(showConfig)
</script>

<template>
  <n-tooltip>
    <template #trigger>
      <n-button quaternary circle @click="toggleShowConfig()">
        <Icon icon="mdi:theme-outline" width="18" />
      </n-button>
    </template>
    本地个性化设置
  </n-tooltip>

  <n-modal v-model:show="showConfig">
    <div
      class="p-6 lg:p-12 bg-white dark:bg-zinc-800 rounded-2xl rounded-bl-none rounded-br-none lg:rounded-bl-2xl lg:rounded-br-2xl mt-5 mb-0 lg:mb-5 shadow w-full max-w-[760px]"
    >
      <div class="sticky z-50 flex justify-end top-6 lg:top-12 lg:-my-4">
        <span
          class="sticky text-white bg-zinc-600 focus:bg-zinc-600 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition"
          @click="toggleShowConfig()"
        >
          <Icon icon="line-md:close" width="18" class="dark:text-zinc-200" />
        </span>
      </div>
      <div class="space-y-2">
        <h3 class="flex items-center gap-2">
          <Icon icon="icon-park-outline:setting-config" width="22" inline class="dark:text-zinc-100" />
          <span class="-mt-0.5 text-lg font-semibold">应用设置</span>
        </h3>
        <p>即时生效，该设置仅限于当前浏览器</p>
      </div>
      <div class="mt-12 space-y-8 text-sm">
        <div class="space-y-3">
          <p class="text-sm font-semibold">网站名称</p>
          <div class="space-y-1 text-xs text-zinc-500 dark:text-zinc-300">
            <p>指的是左上角 LOGO 旁边的标题名称</p>
          </div>
          <n-input v-model:value="appConfig.siteName" placeholder="请输入" />
        </div>
        <div class="space-y-3">
          <p class="text-sm font-semibold">左侧菜单栏宽度</p>
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-3">
              <label>收起宽度</label>
              <n-input-number v-model:value="appConfig.menubarCollapseWidth" class="w-32" />
            </div>
            <div class="flex items-center gap-3">
              <label>展开宽度</label>
              <n-input-number v-model:value="appConfig.menubarExpandWidth" class="w-32" />
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <p class="text-sm font-semibold">网站主题模式</p>
          <div class="space-y-1 text-xs text-zinc-500 dark:text-zinc-300">
            <p>需要注意的是，在暗色模式下，主题色不能够很好的进行适配。</p>
            <p>后续可能会在某个版本更新这个问题，当然在你有解决方案的时候，也可以为开源作出贡献。</p>
          </div>
          <n-select
            v-model:value="themeMode"
            :options="[
              { label: '亮色', value: 'light' },
              { label: '暗色', value: 'dark' },
              { label: '跟随系统', value: 'system' },
            ]"
            class="w-32"
          />
        </div>
        <div class="space-y-3">
          <p class="text-sm font-semibold">主题色</p>
          <div class="space-y-1 text-xs text-zinc-500 dark:text-zinc-300">
            <p>色彩弹窗中预设了多种颜色值，点击即可使用</p>
            <p class="bg-zinc-100 p-1 rounded dark:bg-zinc-900">
              <Icon icon="ic:round-warning" class="inline" width="16" />
              在暗色模式下，黑色系相关颜色未做到兼容，请谨慎选择
            </p>
          </div>
          <AppTheme class="w-44" />
        </div>
        <div class="space-y-3">
          <p class="text-sm font-semibold">显示标签导航栏</p>
          <div class="space-y-1 text-xs text-zinc-500 dark:text-zinc-300">
            <p>默认开启。</p>
            <p>标签导航栏支持右键菜单、顺序拖拽、一键关闭等多个选项</p>
          </div>
          <n-switch v-model:value="appConfig.showTabBar" />
        </div>
      </div>
    </div>
  </n-modal>
</template>
