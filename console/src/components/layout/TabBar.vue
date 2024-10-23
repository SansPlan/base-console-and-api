<script setup lang="ts">
import { useAppConfig, type TabItem } from '@/stores/useAppConfig'
import TabBarItem from './TabBarItem.vue'
import type { DropdownOption } from 'naive-ui'

const route = useRoute()
const router = useRouter()
const appConfig = useAppConfig()

watch(
  () => appConfig.currentTabIndex,
  () => {
    const currentItem = appConfig.tabBarItems[appConfig.currentTabIndex]
    if (currentItem.to.name !== route.name) {
      router.push(currentItem.to)
    }
  },
)

function handleSelectItem(item: TabItem) {
  if (item.to.name !== route.name) {
    router.push(item.to)
  }
}

// 标签栏横向滚动
const scrollContainerRef = shallowRef<HTMLDivElement | null>(null)
let transformX = 0
function handleScroll(e: WheelEvent) {
  e.preventDefault()
  const el = scrollContainerRef.value
  if (!el) return
  transformX = transformX || el.scrollLeft
  const step = e.deltaY > 0 ? 30 : -30
  transformX += step
  // 限制滚动范围
  transformX = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, transformX))
  el.style.transform = `translateX(-${transformX}px)`
}

// navbar 右侧按钮下拉菜单及事件触发
const options: DropdownOption[] = [{ label: '全部关闭', key: 'closeAll' }]
// 右键下拉菜单事件
function handleDropdownEvent(key: string | number) {
  switch (key) {
    case 'closeAll':
      appConfig.removeAllTabItems()
      break
    default:
      console.warn(`未给 ${key} 添加事件`)
      break
  }
}
</script>

<template>
  <div class="sticky inset-x-0 top-0 hidden bg-white border-b h-navbar border-zinc-100 lg:block">
    <div class="flex items-center">
      <div class="flex-grow overflow-hidden whitespace-nowrap" @wheel="handleScroll">
        <div class="flex items-center divide-x divide-zinc-100 h-navbar" ref="scrollContainerRef">
          <TabBarItem
            v-for="(item, index) in appConfig.tabBarItems"
            :key="item.label"
            :tab="item"
            :no-closable="item.to.name.includes('welcome')"
            :is-active="index === appConfig.currentTabIndex"
            @close="() => appConfig.removeTabItem(index)"
            @close-other="() => appConfig.removeOtherTabItems(index)"
            @close-right-tabs="() => appConfig.removeRightTabItems(index)"
            @close-all="() => appConfig.removeAllTabItems()"
            @refresh="() => appConfig.onRefreshTabPage()"
            @select="handleSelectItem"
          />
        </div>
      </div>
      <div class="flex items-center flex-shrink-0 px-2">
        <n-dropdown trigger="click" :options="options" @select="handleDropdownEvent">
          <n-button circle quaternary size="small">
            <Icon icon="icon-park-outline:more" width="20" />
          </n-button>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>
