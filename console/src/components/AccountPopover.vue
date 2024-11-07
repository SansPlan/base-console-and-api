<script setup lang="ts">
import { useAuthorize } from '@/stores/useAuthorize'
import { useAppConfig } from '@/stores/useAppConfig'
import { LOGIN_PAGE } from '@/constants'

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
    onNegativeClick() {
      d.destroy()
    },
    onPositiveClick() {
      d.destroy()
      withLogout(router)
      removeAllTabItems()
      router.push({ name: LOGIN_PAGE.name })
    },
  })
}
</script>

<template>
  <n-popover trigger="click" raw class="p-4 bg-white rounded-2xl dark:bg-zinc-700">
    <template #trigger>
      <n-avatar circle class="bg-white cursor-pointer dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-700" :size="size">
        <Icon icon="mingcute:user-4-fill" width="20" class="text-black dark:text-white" />
      </n-avatar>
    </template>
    <div class="py-4 w-80">
      <div class="text-center">
        <p class="text-xs text-zinc-500 dark:text-zinc-300">849989428@qq.com</p>
        <div class="flex items-center justify-center w-16 h-16 mx-auto mt-5 mb-2 overflow-hidden rounded-full bg-zinc-100">
          <img src="" alt="Avatar" />
        </div>
        <div class="flex-grow">
          <h3 class="text-lg font-semibold">用户昵称，你好！</h3>
        </div>
      </div>
      <p class="flex flex-wrap justify-center gap-1 mt-2">
        <n-tag size="small" type="info">超级管理员</n-tag>
        <n-tag size="small" type="info">项目主管</n-tag>
        <n-tag size="small" type="info">财务主管</n-tag>
      </p>
      <br />
      <div class="grid grid-cols-2 gap-3">
        <n-button round size="large">
          <template #icon>
            <Icon icon="iconoir:user" width="18" />
          </template>
          你的简介
        </n-button>
        <n-button round size="large" @click="onLogout">
          <template #icon>
            <Icon icon="ic:round-logout" width="18" />
          </template>
          退出登录
        </n-button>
      </div>
    </div>
  </n-popover>
</template>
