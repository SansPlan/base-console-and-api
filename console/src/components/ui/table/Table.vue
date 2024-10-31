<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { LTableColumns } from '.'
import { tableProps } from './composable/useTableProps'
import { cn } from '@/lib/tailwindcss'

const props = defineProps(tableProps)

const dataTableBind = computed(() => {
  const { columnSetting, columns, tableClass, ...dataTableProps } = props
  return {
    ...dataTableProps,
    class: cn('flex-grow', tableClass),
  }
})

const cols = ref<DataTableColumns>(props.columns)
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-end flex-shrink-0 gap-3">
      <div class="flex-grow">
        <slot name="action" />
      </div>
      <div class="flex items-center flex-shrink-0 gap-1">
        <slot name="action-right" />
        <LTableColumns :columns="props.columns" @update-columns="(columns: DataTableColumns) => (cols = columns)" />
      </div>
    </div>
    <n-data-table v-bind="dataTableBind" :columns="cols" />
  </div>
</template>
