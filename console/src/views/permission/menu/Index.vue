<script lang="ts">
export default {
  name: 'PermissionMenu',
}
</script>

<script setup lang="ts">
import MenuTree from './components/MenuTree.vue'
import MenuInfo from './components/MenuInfo.vue'
import routes from '@/router/routes.json'

interface TreeNodeSelect {
  type: string
  value: ObjectAny | null
}

const menuTreeData = ref<any[]>(routes)

const contextmenuOption = ref<TreeNodeSelect>({
  type: '',
  value: null,
})

function handleSelect(options: TreeNodeSelect) {
  contextmenuOption.value = options
}

function handleUpdate() {
  console.log('update')
}
</script>

<template>
  <main class="p-3 pr-0 h-pageHeight data-[tabbar=true]:h-pageHeight2 flex gap-3">
    <n-scrollbar class="sticky top-0 bg-white border rounded-lg dark:bg-zinc-900 dark:border-zinc-800 w-80" content-class="px-3 py-2">
      <MenuTree :options="menuTreeData" @select="handleSelect" />
    </n-scrollbar>
    <n-scrollbar class="flex-grow" content-class="space-y-4">
      <fieldset class="px-4 py-3 bg-white border rounded-lg dark:bg-zinc-900 dark:border-zinc-800">
        <legend class="text-base">
          <p class="flex items-center gap-1">
            <Icon icon="ic:outline-tips-and-updates" class="text-orange-500" width="16" />
            <span>权限菜单</span>
          </p>
        </legend>
        <ul class="pl-4 space-y-1.5 list-decimal">
          <li>根目录作为虚拟数据节点，不允许进行操作</li>
          <li>在路由树鼠标右键点击可调出菜单进行操作</li>
          <li>当新建菜单后，会自动为该菜单新建 <n-tag size="tiny" round type="primary">CRUD</n-tag> 相关按钮权限；也支持自行添加按钮。</li>
        </ul>
      </fieldset>
      <div class="flex-grow p-8 rounded-lg dark:bg-zinc-900">
        <MenuInfo :type="contextmenuOption.type" :menus="menuTreeData" :options="contextmenuOption.value" @update="handleUpdate" />
      </div>
    </n-scrollbar>
  </main>
</template>
