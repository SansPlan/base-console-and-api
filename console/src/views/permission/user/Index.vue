<template>
  <main class="flex flex-col p-3 h-pageHeight data-[tabbar=true]:h-pageHeight2">
    <s-table remote flex-height :columns="columns" :data="userList" :pagination="pagination" class="flex-grow" row-class-name="group relative">
      <template #action>
        <n-form inline :show-feedback="false" label-placement="left">
          <n-form-item>
            <n-input />
          </n-form-item>
        </n-form>
      </template>
    </s-table>
  </main>
</template>

<script lang="ts">
import { STable } from '@/components/ui/table'
import { NAvatar, NButton, NPopconfirm, type DataTableColumns } from 'naive-ui'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'PermissionUser',
  components: { STable },
  setup() {
    const columns: DataTableColumns = [
      { title: 'ID', key: 'id', width: 80 },
      {
        title: '头像',
        key: 'avatar',
        render(row: ObjectAny) {
          return h(NAvatar, { src: row.avatar })
        },
        width: 60,
      },
      { title: '昵称', key: 'nickname' },
      { title: '账号', key: 'username' },
      {
        title: '性别',
        key: 'sex',
        render(row: ObjectAny) {
          const sexEnum: ObjectAny = {
            0: {
              icon: 'ic:round-male',
              iconClass: 'text-blue-500 dark:text-blue-300',
              label: '男',
            },
            1: {
              icon: 'ic:round-female',
              iconClass: 'text-pink-500 dark:text-pink-300',
              label: '女',
            },
          }
          const item = sexEnum[row.sex]
          return h('p', { class: 'flex items-center gap-1' }, [
            h(Icon, {
              icon: item?.icon || 'tdesign:user-unknown',
              class: item?.iconClass,
              width: 16,
            }),
            h('span', item?.label || '未知'),
          ])
        },
        width: 60,
      },
      {
        title: '操作',
        key: 'action',
        align: 'right',
        width: 60,
        render(row: ObjectAny) {
          return h('div', { class: 'flex items-center justify-end' }, [
            h(
              'p',
              {
                class:
                  'flex items-center gap-1 opacity-0 group-hover:opacity-100 transition absolute right-2 top-1/2 -translate-y-1/2 z-[1] bg-[rgba(247,247,250,1)] dark:bg-zinc-800',
              },
              [
                h(NButton, { quaternary: true, circle: true }, { default: () => h(Icon, { icon: 'solar:eye-broken', width: 18 }) }),
                h(NButton, { quaternary: true, circle: true }, { default: () => h(Icon, { icon: 'cuida:edit-outline', width: 18 }) }),
                h(
                  NPopconfirm,
                  {},
                  {
                    trigger: () => h(NButton, { quaternary: true, circle: true }, { default: () => h(Icon, { icon: 'fluent:delete-12-regular', width: 18 }) }),
                    default: () => `确定删除用户(${row.nickname})？`,
                  },
                ),
              ],
            ),
            h(Icon, { icon: 'weui:more-outlined', width: 18, class: 'group-hover:opacity-0 transition mr-1' }),
          ])
        },
      },
    ]

    const userList = ref<ObjectAny[]>(
      Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        avatar: '',
        nickname: `NickName${index}`,
        username: `UserName${index}`,
        sex: index % 2,
      })),
    )

    const pagination = reactive({
      page: 1,
      pageSize: 20,
      itemCount: 60,
      showSizePicker: true,
      pageSizes: [20, 30, 50, 80, 100],
      onUpdatePage(page: number) {
        pagination.page = page
      },
      onUpdatePageSize(pageSize: number) {
        pagination.page = 1
        pagination.pageSize = pageSize
      },
    })

    return {
      columns,
      userList,
      pagination,
    }
  },
})
</script>
