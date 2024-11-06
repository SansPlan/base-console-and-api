<script setup lang="ts">
import { useAppConfig, type TabItem } from '@/stores/useAppConfig'
import { FIXED_TABLE_ITEM } from '@/constants'
import TabBarItem from './TabBarItem.vue'
import type { DropdownOption } from 'naive-ui'
import { useSortable } from '@vueuse/integrations/useSortable'

const route = useRoute()
const router = useRouter()
const appConfig = useAppConfig()

watch(
  () => appConfig.currentTabKey,
  () => {
    const currentItem = appConfig.tabBarItems.filter(item => item).find(item => item.name === appConfig.currentTabKey)
    if (currentItem && currentItem.name !== route.name) {
      router.push(currentItem.to)
    }
  },
)

function handleSelectItem(item: TabItem) {
  if (item.name !== route.name) {
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

// 支持标签拖拽
useSortable(scrollContainerRef, appConfig.tabBarItems)

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
  <div
    class="sticky inset-x-0 top-0 z-[1] hidden overflow-hidden bg-white border-b border-zinc-200/75 dark:border-zinc-700/75 h-navbar dark:bg-zinc-900 lg:block"
  >
    <div class="flex items-center">
      <div class="flex-grow overflow-hidden whitespace-nowrap" @wheel="handleScroll">
        <div class="flex items-center divide-x h-navbar" ref="scrollContainerRef">
          <template v-for="(item, index) in appConfig.tabBarItems.filter(item => item)" :key="item.name">
            <TabBarItem
              :tab="item"
              :no-closable="item.name === FIXED_TABLE_ITEM.name"
              :is-active="item.name === appConfig.currentTabKey"
              @close="() => appConfig.removeTabItem(index)"
              @close-other="() => appConfig.removeOtherTabItems(index)"
              @close-right-tabs="() => appConfig.removeRightTabItems(index)"
              @close-all="() => appConfig.removeAllTabItems()"
              @refresh="() => appConfig.onRefreshTabPage()"
              @select="handleSelectItem"
            />
          </template>
        </div>
      </div>
      <div class="flex items-center flex-shrink-0 px-2">
        <n-dropdown trigger="click" :options="options" @select="handleDropdownEvent">
          <n-button circle quaternary>
            <Icon icon="mdi:more-horiz" width="20" />
          </n-button>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>
