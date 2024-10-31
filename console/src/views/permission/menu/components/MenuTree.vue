<script setup lang="ts">
import { MAIN_VIEW } from '@/constants'
import { convertListToTree } from '@/lib/tree'
import type { DropdownOption, TreeOption } from 'naive-ui'
import { Icon } from '@iconify/vue'

interface MenuTreeProp {
  options: any[]
}

const dialog = useDialog()
const props = defineProps<MenuTreeProp>()
const emit = defineEmits(['select'])

// 路由树
const tree = computed(() => {
  const { options } = props
  return [
    {
      title: '根路由',
      name: 'root',
      disabled: true,
      children: convertListToTree(options, MAIN_VIEW.name),
    },
  ]
})

// 右键事件选择的菜单路由
const selectOption = ref<any>()
const checkedKeys = computed(() => [selectOption.value?.name].filter(item => item))

// Tree Node 右键事件选项
const dropdownReactive = shallowReactive({
  show: false,
  offsetX: 0,
  offsetY: 0,
})
const nodeContextmenuOptions = computed<DropdownOption[]>(() => {
  return [
    {
      key: 'header',
      type: 'render',
      render: () =>
        h('div', { class: 'p-2 text-xs text-zinc-500 dark:text-zinc-300 space-y-1 w-32' }, [
          h('p', '对该路由进行操作'),
          h('p', { class: 'text-sm text-black dark:text-white' }, selectOption.value.title),
        ]),
    },
    {
      key: 'header-divider',
      type: 'divider',
    },
    {
      label: '新建子级',
      key: 'createChildrenItem',
      icon() {
        return h(Icon, {
          icon: 'icon-park-outline:add-web',
          size: 18,
        })
      },
      props: {
        onClick() {
          emit('select', {
            type: 'NewChildNode',
            value: unref(selectOption),
          })
        },
      },
    },
    {
      label: '编辑',
      key: 'modify',
      disabled: selectOption.value?.name === 'root',
      icon() {
        return h(Icon, {
          icon: 'cuida:edit-outline',
          size: 18,
        })
      },
      props: {
        onClick() {
          emit('select', {
            type: 'EditOneself',
            value: unref(selectOption),
          })
        },
      },
    },
    {
      label: '删除',
      key: 'delete',
      disabled: selectOption.value?.name === 'root',
      icon() {
        return h(Icon, {
          icon: 'f7:delete-left',
          size: 18,
        })
      },
      props: {
        onClick() {
          const d = dialog.warning({
            title: '权限提示',
            content: `请确保路由 ${selectOption.value.title} 已撤销所有入口，避免路由删除后点击出现错误！`,
            negativeText: '取消',
            positiveText: '我已经确认',
            onPositiveClick() {
              d.loading = true
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(true)
                }, 1500)
              })
            },
          })
        },
      },
    },
  ]
})

const onHideDropdown = () => (dropdownReactive.show = false)

function nodeProps({ option }: { option: TreeOption }) {
  return {
    onClick() {
      selectOption.value = option
      emit('select', {
        type: 'EditOneself',
        value: unref(option),
      })
    },
    onContextmenu(e: MouseEvent): void {
      selectOption.value = option
      dropdownReactive.show = true
      dropdownReactive.offsetX = e.clientX
      dropdownReactive.offsetY = e.clientY
      e.preventDefault()
    },
  }
}
</script>

<template>
  <n-tree :selected-keys="checkedKeys" :data="tree" block-line default-expand-all key-field="name" label-field="title" selectable :node-props="nodeProps" />
  <n-dropdown
    trigger="manual"
    placement="bottom-start"
    :show="dropdownReactive.show"
    :options="nodeContextmenuOptions"
    :x="dropdownReactive.offsetX"
    :y="dropdownReactive.offsetY"
    @select="onHideDropdown"
    @clickoutside="onHideDropdown"
  />
</template>
