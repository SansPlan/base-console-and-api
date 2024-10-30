<script setup lang="ts">
import { type TabItem } from '@/stores/useAppConfig'
import type { DropdownOption } from 'naive-ui'
import { IeLogo } from '../@increase-exp'

interface Prop {
  tab: TabItem
  noClosable: boolean
  isActive: boolean
}

defineProps<Prop>()
const emit = defineEmits(['select', 'refresh', 'close', 'closeOther', 'closeRightTabs', 'closeAll'])

// 下拉菜单显示与位置
const offset = reactive({
  show: false,
  x: 0,
  y: 0,
})
const options: DropdownOption[] = [
  { label: '刷新页面', key: 'refresh' },
  { label: '关闭', key: 'close' },
  { label: '关闭其他', key: 'closeOther' },
  { label: '关闭右侧标签', key: 'closeRightTabs' },
  { label: '关闭所有', key: 'closeAll' },
]

function handleContextMenu(e: MouseEvent) {
  e.preventDefault()
  offset.show = false
  nextTick().then(() => {
    offset.show = true
    offset.x = e.clientX
    offset.y = e.clientY
  })
}

// 右键下拉菜单事件
function handleContextMenuEvent(key: string | number) {
  switch (key) {
    case 'refresh':
      emit('refresh')
      break
    case 'closeOther':
      emit('closeOther')
      break
    case 'closeRightTabs':
      emit('closeRightTabs')
      break
    case 'closeAll':
      emit('closeAll')
      break
    default:
      emit('close')
      break
  }
  offset.show = false
}
</script>

<template>
  <div
    class="flex items-center flex-shrink-0 gap-2 px-2 overflow-hidden transition cursor-pointer select-none group h-navbar"
    :class="isActive ? 'bg-zinc-100 dark:bg-zinc-700 dark:text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200'"
    @contextmenu="handleContextMenu"
    @click="emit('select', tab)"
  >
    <Icon v-if="tab.icon" :icon="tab.icon" width="14" />
    <IeLogo v-else :size="16" />
    <p class="text-[0.8125rem] whitespace-nowrap">{{ tab.label }}</p>
    <span
      v-if="!noClosable"
      class="p-0.5 transition-all cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded"
      :class="isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'"
      @click.prevent="emit('close')"
    >
      <Icon icon="mi:close" width="14" />
    </span>
  </div>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="offset.x"
    :y="offset.y"
    :show="offset.show"
    :options="options"
    :on-clickoutside="() => (offset.show = false)"
    @select="handleContextMenuEvent"
  />
</template>
