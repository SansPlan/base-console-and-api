<script setup lang="ts">
import { type TabItem } from '@/stores/useAppConfig'
import type { DropdownOption } from 'naive-ui'

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
    class="flex items-center flex-shrink-0 pr-2 overflow-hidden transition select-none group"
    :class="isActive ? 'bg-zinc-50' : 'hover:bg-zinc-50'"
    @contextmenu="handleContextMenu"
  >
    <p class="pl-3 pr-1 h-navbar flex items-center text-[0.8125rem] cursor-pointer whitespace-nowrap" @click="emit('select', tab)">{{ tab.label }}</p>
    <span
      v-if="!noClosable"
      class="p-0.5 transition-all cursor-pointer hover:bg-zinc-200 rounded"
      :class="isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'"
      @click="emit('close')"
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
