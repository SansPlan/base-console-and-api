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
      name: MAIN_VIEW.name,
      disabled: true,
      children: convertListToTree(options, MAIN_VIEW.name),
    },
  ]
})

// 右键事件选择的菜单路由
const selectOption = ref<any>()
const contextmenuOption = ref<any>()
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
      type: 'render',
      key: 'header',
      render: () =>
        h(
          'div',
          {
            class: 'px-3 py-2.5 dark:text-white',
          },
          [
            h('p', { class: 'flex items-center gap-2' }, [
              h(Icon, { icon: 'file-icons:actionscript', class: 'text-orange-500 dark:text-orange-300' }),
              h('span', `${contextmenuOption.value.title} 动作`),
            ]),
          ],
        ),
    },
    {
      type: 'divider',
      key: 'HeaderDivider',
    },
    {
      label: '新建子级',
      key: 'createChildNode',
      icon() {
        return h(Icon, {
          icon: 'icon-park-outline:add-web',
          size: 18,
        })
      },
    },
    {
      label: '编辑',
      key: 'edit',
      disabled: contextmenuOption.value?.name === MAIN_VIEW.name,
      icon() {
        return h(Icon, {
          icon: 'cuida:edit-outline',
          size: 18,
        })
      },
    },
    {
      label: '删除',
      key: 'delete',
      disabled: contextmenuOption.value?.name === MAIN_VIEW.name,
      icon() {
        return h(Icon, {
          icon: 'f7:delete-left',
          size: 18,
        })
      },
    },
  ]
})

const onHideDropdown = () => (dropdownReactive.show = false)

function nodeProps({ option }: { option: TreeOption }) {
  return {
    onClick() {
      if (option.name !== MAIN_VIEW.name) {
        selectOption.value = option
        emit('select', {
          type: 'EditOneself',
          value: unref(option),
        })
      }
    },
    onContextmenu(e: MouseEvent): void {
      contextmenuOption.value = option
      dropdownReactive.show = true
      dropdownReactive.offsetX = e.clientX
      dropdownReactive.offsetY = e.clientY
      e.preventDefault()
    },
  }
}

function handleDropdownSelect(key: string) {
  switch (key) {
    case 'createChildNode':
      selectOption.value = contextmenuOption.value
      emit('select', {
        type: 'NewChildNode',
        value: unref(contextmenuOption),
      })
      break
    case 'edit':
      selectOption.value = contextmenuOption.value
      emit('select', {
        type: 'EditOneself',
        value: unref(contextmenuOption),
      })
      break
    case 'delete':
      const d = dialog.warning({
        title: '权限提示',
        content: `请确保路由 ${contextmenuOption.value.title} 已撤销所有入口，避免路由删除后点击出现错误！`,
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
      break
    default:
      console.log('未触发任何选项')
      break
  }
  onHideDropdown()
}
</script>

<template>
  <n-config-provider :theme-overrides="{ Tree: { lineHeight: 2.5, nodeWrapperPadding: '0', nodeBorderRadius: '5px' } }">
    <n-tree :selected-keys="checkedKeys" :data="tree" block-line default-expand-all key-field="name" label-field="title" selectable :node-props="nodeProps" />
  </n-config-provider>
  <n-dropdown
    trigger="manual"
    placement="bottom-start"
    :show="dropdownReactive.show"
    :options="nodeContextmenuOptions"
    :x="dropdownReactive.offsetX"
    :y="dropdownReactive.offsetY"
    @select="handleDropdownSelect"
    @clickoutside="onHideDropdown"
    class="w-44"
  />
</template>
