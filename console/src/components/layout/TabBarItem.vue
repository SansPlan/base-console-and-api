<script setup lang="ts">
import { type TabItem } from '@/stores/useAppConfig'
import type { DropdownOption } from 'naive-ui'
import { SLogo } from '../uninportance'

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
    class="flex items-center flex-shrink-0 h-full gap-2 px-3 overflow-hidden transition cursor-pointer select-none group"
    :class="isActive ? 'bg-zinc-200/65 dark:bg-black' : ''"
    @contextmenu="handleContextMenu"
    @click="emit('select', tab)"
  >
    <Icon v-if="tab.icon" :icon="tab.icon" width="14" />
    <SLogo v-else :size="14" />
    <p class="text-[0.8125rem] whitespace-nowrap">{{ tab.label }}</p>
    <span
      v-if="!noClosable"
      class="p-0.5 transition-all cursor-pointer dark:hover:bg-zinc-950 rounded -mr-1"
      :class="isActive ? 'scale-100 hover:bg-zinc-300' : 'scale-0 group-hover:scale-100 hover:bg-zinc-300'"
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
