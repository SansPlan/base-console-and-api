<script setup lang="ts">
import { MAIN_VIEW } from '@/constants'
import { convertListToTree } from '@/lib/tree'
import { useCloned } from '@vueuse/core'
import type { FormRules } from 'naive-ui'

interface MenuInfoProp {
  options: ObjectAny | null
  type: string
  menus: ObjectAny[]
}

// 菜单类型
type MenuType = 'folder' | 'menu' | 'button'

// 表单字段类型
interface MenuFields {
  id?: string | number
  parentId?: string | number
  type: MenuType
  path: string
  name: string
  title: string
  icon?: string
  componentPath: string | null
  showAside: boolean
  keepAlive: boolean
  isRedirect: boolean
  redirect: {
    name: string
    params?: {
      key: string
      value: string
    }[]
  }
}

const props = defineProps<MenuInfoProp>()

// 路由树
const tree = computed(() => {
  const { menus } = props
  return [
    {
      title: '根路由',
      name: MAIN_VIEW.name,
      children: convertListToTree(menus, MAIN_VIEW.name),
    },
  ]
})

const formRef = shallowRef<HTMLFormElement | null>(null)
const componentPaths = Object.keys(import.meta.glob('/src/views/**/*.vue', { eager: true })).map(item => ({
  label: item,
  value: item.replace(/^.*views\/|(\.vue)$/g, ''),
}))

const { cloned: fields, sync } = useCloned<MenuFields>({
  id: '',
  parentId: '',
  type: 'menu',
  path: '',
  name: '',
  title: '',
  icon: '',
  componentPath: null,
  showAside: true,
  keepAlive: true,
  isRedirect: false,
  redirect: {
    name: '',
  },
})
const rules = computed<FormRules>(() => ({
  path: { required: true, message: '请填写路由地址', trigger: 'blur' },
  name: { required: true, message: '请填写路由标识', trigger: 'blur' },
  title: { required: true, message: '请填写显示标题', trigger: 'blur' },
  componentPath: { required: true, message: '请输入组件地址', trigger: 'blur' },
  'redirect.name': {
    required: fields.value.isRedirect,
    validator(_, value) {
      if (!value) {
        return new Error('请提供回调路由标识')
      }
      return true
    },
    trigger: 'blur',
  },
}))

function resolveMenuInfo() {
  const { type, options } = props
  if (options) {
    if (type === 'EditOneself') {
      for (const key in fields.value) {
        ;(fields.value as ObjectAny)[key] = options[key] || (fields.value as ObjectAny)[key]
      }
      fields.value.parentId = options.parentName
    }
    if (type === 'NewChildNode') {
      fields.value.parentId = options.id || options.name
    }
  }
}

watch(props, handleReset)

// 重置表单
function handleReset() {
  sync()
  resolveMenuInfo()
}

// 保存路由数据
function handleSave() {
  formRef.value?.validate(async (error: any) => {
    if (!error) {
      // next
      console.log(toRaw(unref(fields)))
    }
  })
}
</script>

<template>
  <div class="w-[640px]">
    <template v-if="!options">
      <n-empty description="请从左侧选择父级菜单" class="py-32" />
    </template>
    <template v-else>
      <div class="mb-8">
        <h3 class="text-xl">路由表单</h3>
        <p class="mt-2 text-zinc-500 dark:text-zinc-300">当父级路由未选择时，默认为根路由</p>
      </div>
      <n-form ref="formRef" :model="fields" :rules="rules" label-placement="left" label-width="150">
        <n-form-item label="路由类型" path="type">
          <n-radio-group v-model:value="fields.type">
            <n-radio value="folder">目录</n-radio>
            <n-radio value="menu">菜单</n-radio>
            <n-radio value="button">按钮</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="父级路由" path="parentId">
          <n-tree-select v-model:value="fields.parentId" :options="tree" label-field="title" key-field="name" default-expand-all show-path />
        </n-form-item>
        <n-form-item label="路由标识" path="name">
          <div class="flex-grow">
            <n-input v-model:value="fields.name" />
            <p class="mt-1 text-xs text-zinc-400 dark:text-zinc-300">路由标识需要保持唯一，否则在加载后会导致覆盖前面标识一致的路由</p>
          </div>
        </n-form-item>
        <n-form-item label="标题" path="title">
          <n-input v-model:value="fields.title" />
        </n-form-item>
        <n-form-item label="组件地址" path="componentPath">
          <n-select v-model:value="fields.componentPath" :options="componentPaths" :disabled="fields.type === 'button'" filterable />
        </n-form-item>
        <n-form-item label="图标" path="icon">
          <div class="flex-grow space-y-2">
            <n-input v-model:value="fields.icon" />
            <p class="text-xs">
              本项目所使用图标库为 <n-tag size="tiny" type="primary">@iconify/vue</n-tag>，可前往
              <n-button text tag="a" type="primary" size="tiny" href="https://icon-sets.iconify.design/" target="_blank">
                <span>获取图标名称</span>
                <Icon icon="tabler:external-link" width="15" />
              </n-button>
            </p>
          </div>
        </n-form-item>
        <n-form-item label="在侧边栏显示" path="showAside">
          <n-switch v-model:value="fields.showAside" />
        </n-form-item>
        <n-form-item label="启用 KeepAlive 缓存" path="keepAlive">
          <n-switch v-model:value="fields.keepAlive" />
        </n-form-item>
        <n-form-item label="启用路由回调" path="redirect">
          <n-switch v-model:value="fields.isRedirect" />
        </n-form-item>
        <template v-if="fields.isRedirect">
          <n-form-item label="路由回调标识" path="redirect.name">
            <n-input v-model:value="fields.redirect.name" />
          </n-form-item>
          <n-form-item label="回调参数">
            <n-dynamic-input preset="pair" v-model:value="fields.redirect.params" key-placeholder="参数名" value-placeholder="参数值" />
          </n-form-item>
        </template>
        <n-space class="pl-[150px]">
          <n-button type="primary" @click="handleSave">
            <template #icon>
              <Icon icon="hugeicons:task-done-01" />
            </template>
            保存数据
          </n-button>
          <n-popconfirm trigger="click" @positive-click="handleReset">
            <template #trigger>
              <n-button quaternary>
                <template #icon>
                  <Icon icon="bx:reset" />
                </template>
                重置表单
              </n-button>
            </template>
            请谨慎重置表单
          </n-popconfirm>
        </n-space>
      </n-form>
    </template>
  </div>
</template>
