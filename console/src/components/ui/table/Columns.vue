<script setup lang="ts">
import { type TableColumnProps } from './composable/useTableProps'
import type { DataTableColumn } from 'naive-ui'
import { useSortable } from '@vueuse/integrations/useSortable'
import { useToggle } from '@vueuse/core'

const props = defineProps<TableColumnProps>()
const emit = defineEmits(['updateColumns'])

const showPopover = ref<boolean>(false)
const togglePopover = useToggle(showPopover)
const columnsRef = shallowRef<HTMLDivElement | null>(null)

const tableRowSelection = ref<boolean>(false)
const columnList = ref<DataTableColumn[]>([])
const columnKeys = ref<(string | number)[]>([])

// 数据格式化
function formatColumns() {
  const { columns } = props
  if (columns && columns.length) {
    columnList.value = toRaw(unref(columns)).filter((item: DataTableColumn) => {
      if (item.type && item.type === 'selection') {
        tableRowSelection.value = true
      }
      return item
    })
    columnKeys.value = columnList.value.map((item: DataTableColumn) => (item as ObjectAny).key)
  }
}
watch(() => props.columns, formatColumns)
onMounted(formatColumns)

// 表头数据变更触发 emit
function updateColumns() {
  const useCols = toRaw(unref(columnList))
    .map((item: DataTableColumn) => {
      if (columnKeys.value.includes((item as ObjectAny).key)) {
        return item
      }
    })
    .filter(item => item)
  emit('updateColumns', useCols)
}

watch(showPopover, show => {
  if (show) {
    nextTick().then(() => {
      useSortable(columnsRef, columnList, {
        onEnd(e: any) {
          nextTick(updateColumns)
        },
      })
    })
  }
})

function onUpdateCheckboxGroupValue(value: (string | number)[]) {
  columnKeys.value = value
  updateColumns()
}

// 重置表头
function onResetColumns() {
  formatColumns()
  updateColumns()
}
</script>

<template>
  <n-popover :show="showPopover" trigger="click" raw placement="bottom" :show-arrow="false" @update-show="togglePopover">
    <template #trigger>
      <n-tooltip>
        <template #trigger>
          <n-button quaternary circle @click="togglePopover()">
            <Icon icon="flowbite:table-column-outline" width="18" />
          </n-button>
        </template>
        表头栏设置
      </n-tooltip>
    </template>
    <div class="flex flex-col bg-white border rounded-md max-h-96 w-44 dark:bg-zinc-800 dark:border-zinc-700">
      <div class="flex items-center border-b border-b-zinc-100 dark:border-b-zinc-700/40 p-1.5">
        <n-button quaternary size="small" @click="onResetColumns">重置</n-button>
      </div>
      <div class="flex-grow">
        <n-scrollbar content-class="p-1.5">
          <n-checkbox-group :value="columnKeys" @update-value="onUpdateCheckboxGroupValue" ref="columnsRef">
            <div v-for="col in columnList" :key="col.key" class="px-2 py-1 transition rounded cursor-grab hover:bg-zinc-100 dark:hover:bg-zinc-900">
              <n-checkbox :value="col.key" :label="col.title" />
            </div>
          </n-checkbox-group>
        </n-scrollbar>
      </div>
    </div>
  </n-popover>
</template>
