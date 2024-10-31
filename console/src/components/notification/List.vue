<script setup lang="ts">
import { type MessageItem } from '.'

const emit = defineEmits(['select'])

const messageList = ref<MessageItem[]>(
  Array.from({ length: 10 }, (_, index) => ({
    id: index,
    title: '[IncreaseExp] - 新应用发布，点击获取优先体验权限并有机会免费获得团队使用名额',
    descript: 'ExpTeam 业务应用正式上线，本次项目未开放源代码自行部署',
    content: '[IncreaseExp] - 新应用发布，点击获取优先体验权限并有机会免费获得团队使用名额, ExpTeam 业务应用正式上线，本次项目未开放源代码自行部署',
    tag: ['团队协作'],
    href: 'https://team.increaseexp.com/',
  })),
)
</script>

<template>
  <n-scrollbar class="flex-shrink-0 bg-white border-r dark:bg-zinc-900 lg:w-64 border-r-zinc-100 dark:border-r-zinc-700">
    <div class="divide-y divide-zinc-100 dark:divide-zinc-700 *:p-3">
      <div
        v-for="item in messageList"
        :key="item.id"
        class="space-y-3 transition cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
        @click="emit('select', item)"
      >
        <p class="text-sm">{{ item.title }}</p>
        <p class="flex gap-1">
          <n-tag v-for="tag in item.tag" :key="tag" size="small" type="info">{{ tag }}</n-tag>
        </p>
      </div>
    </div>
  </n-scrollbar>
</template>
