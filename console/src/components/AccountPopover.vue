<script setup lang="ts">
interface Prop {
  size: number | 'small' | 'medium' | 'large' | undefined
}

defineProps<Partial<Prop>>()
</script>

<template>
  <n-popover trigger="click">
    <template #trigger>
      <n-avatar circle class="cursor-pointer" :size="size">U</n-avatar>
    </template>
    <div class="py-2 w-44">
      <div class="flex gap-3">
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
      <hr class="my-3 border-t-zinc-200/60" />
      <ul class="space-y-0.5">
        <li>
          <div class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-100 transition text-sm cursor-pointer">
            <Icon icon="iconoir:user" width="18" />
            <p>你的简介</p>
          </div>
        </li>
        <li>
          <div class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-100 transition text-sm cursor-pointer">
            <Icon icon="lets-icons:comment" width="18" />
            <p>你的企业评价</p>
          </div>
        </li>
        <li>
          <div class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-100 transition text-sm cursor-pointer">
            <Icon icon="typcn:cog-outline" width="18" />
            <p>个性化设置</p>
          </div>
        </li>
      </ul>
      <hr class="my-3 border-t-zinc-200/60" />
      <ul class="space-y-0.5">
        <li>
          <div class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-100 transition text-sm cursor-pointer">
            <Icon icon="ic:round-logout" width="18" />
            <p>退出登录</p>
          </div>
        </li>
      </ul>
    </div>
  </n-popover>
</template>
