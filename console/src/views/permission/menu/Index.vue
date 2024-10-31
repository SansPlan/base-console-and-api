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
  <main class="p-3 space-y-3 h-pageHeight data-[tabbar=true]:h-pageHeight2 flex flex-col">
    <fieldset class="px-4 py-2 bg-white border rounded-md dark:bg-zinc-900 dark:border-zinc-800">
      <legend>
        <p class="flex items-center gap-1">
          <Icon icon="ic:outline-tips-and-updates" class="text-orange-500" width="16" />
          <span>权限菜单</span>
        </p>
      </legend>
      <ul class="pl-4 space-y-1 list-decimal">
        <li>根目录作为虚拟数据节点，不允许进行操作</li>
        <li>在路由树鼠标右键点击可调出菜单进行操作</li>
        <li>当新建菜单后，会自动为该菜单新建 <n-tag size="tiny" round type="primary">CRUD</n-tag> 相关按钮权限；也支持自行添加按钮。</li>
      </ul>
    </fieldset>
    <section class="flex flex-grow gap-3 overflow-hidden">
      <n-scrollbar class="flex-shrink-0 bg-white border rounded-md w-80" content-class="px-2 py-1">
        <MenuTree :options="menuTreeData" @select="handleSelect" />
      </n-scrollbar>
      <n-scrollbar class="flex-grow bg-white border rounded-md">
        <MenuInfo :type="contextmenuOption.type" :options="contextmenuOption.value" @update="handleUpdate" />
      </n-scrollbar>
    </section>
  </main>
</template>
