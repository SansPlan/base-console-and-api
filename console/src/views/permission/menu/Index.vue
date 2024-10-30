<script lang="ts">
export default {
  name: 'LearnPermissionMenu',
}
</script>

<script setup lang="ts">
import { LTable } from '@/components/ui/table'
import type { DataTableColumns } from 'naive-ui'

const columns: DataTableColumns = [
  { title: '标题 1', key: 'title1' },
  { title: '标题 2', key: 'title2' },
  { title: '标题 3', key: 'title3' },
  { title: '标题 4', key: 'title4' },
  { title: '标题 5', key: 'title5' },
  { title: '标题 6', key: 'title6' },
]

const data = ref<any[]>(
  Array.from({ length: 20 }, (_, index) => ({
    id: ++index,
    title1: 'Test1',
    title2: 'Test2',
    title3: 'Test3',
    title4: 'Test4',
    title5: 'Test5',
    title6: 'Test6',
  })),
)
</script>

<template>
  <main class="p-3 space-y-3">
    <fieldset class="px-4 py-2 bg-white border rounded-md dark:bg-zinc-900 dark:border-zinc-800">
      <legend>
        <p class="flex items-center gap-1">
          <Icon icon="ic:outline-tips-and-updates" class="text-orange-500" width="16" />
          <span>权限菜单</span>
        </p>
      </legend>
      <div class="space-y-1">
        <p>为避免后续权限问题出现，每个新建的数据都必须填写 PremissionCode 且后续不可更改。</p>
        <p>当新建菜单后，会自动为该菜单新建 <n-tag size="tiny" round type="primary">CRUD</n-tag> 相关按钮权限。</p>
      </div>
    </fieldset>
    <LTable remote flex-height :columns="columns" :data="data" class="p-2 bg-white rounded h-96 dark:bg-zinc-800" size="small">
      <template #action>
        <n-form inline label-placement="left" :show-feedback="false">
          <n-form-item label="标题">
            <n-input />
          </n-form-item>
        </n-form>
      </template>
      <template #action-right>
        <n-button quaternary circle>
          <Icon icon="lsicon:filter-outline" width="18" />
        </n-button>
      </template>
    </LTable>
  </main>
</template>
