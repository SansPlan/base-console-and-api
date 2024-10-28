<script setup lang="ts">
import { useAuthorize } from '@/stores/useAuthorize'
import { useAppConfig } from '@/stores/useAppConfig'

interface Prop {
  size: number | 'small' | 'medium' | 'large' | undefined
}

defineProps<Partial<Prop>>()

const dialog = useDialog()
const router = useRouter()
const { userInfo, withLogout } = useAuthorize()
const { tabBarItems, removeAllTabItems } = useAppConfig()

function onLogout() {
  let content: string = `再次确认退出当前账号：${userInfo.name}`
  if (tabBarItems.length > 1) {
    content = '退出账号后将丢失本地状态，已打开的标签页如有未保存内容也会丢失，继续吗？'
  }
  const d = dialog.warning({
    title: '账号提示',
    content,
    maskClosable: false,
    closeOnEsc: false,
    closable: false,
    negativeText: '取消',
    positiveText: '继续退出',
    onPositiveClick() {
      d.destroy()
      withLogout(router)
      removeAllTabItems()
      router.push('/login')
    },
  })
}
</script>

<template>
  <n-popover trigger="click" raw class="rounded-md" :show-arrow="false">
    <template #trigger>
      <n-avatar circle class="bg-white cursor-pointer dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-700" :size="size">
        <Icon icon="mingcute:user-4-fill" width="20" class="text-black dark:text-white" />
      </n-avatar>
    </template>
    <div class="w-56 p-2 py-2 bg-white rounded-md dark:bg-zinc-800">
      <div class="flex gap-3 py-2">
        <div class="flex-shrink-0">
          <n-avatar circle />
        </div>
        <div class="flex-grow">
          <h3 class="text-sm font-semibold">你的昵称</h3>
          <p class="text-xs text-zinc-500">你的账号</p>
        </div>
      </div>
      <p class="flex flex-wrap gap-1 mt-2">
        <n-tag size="small" type="info">超级管理员</n-tag>
        <n-tag size="small" type="info">项目主管</n-tag>
        <n-tag size="small" type="info">财务主管</n-tag>
      </p>
      <hr class="my-3 border-t-zinc-200/60 dark:border-t-zinc-700/60" />
      <ul class="space-y-0.5">
        <li>
          <div class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-950 transition cursor-pointer">
            <Icon icon="iconoir:user" width="18" />
            <p>你的简介</p>
          </div>
        </li>
        <li>
          <div class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-950 transition cursor-pointer" @click="onLogout">
            <Icon icon="ic:round-logout" width="18" />
            <p>退出登录</p>
          </div>
        </li>
      </ul>
    </div>
  </n-popover>
</template>
