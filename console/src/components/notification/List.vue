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
  <n-scrollbar class="flex-shrink-0 bg-white dark:bg-zinc-900 lg:w-72">
    <div class="*:p-4">
      <div
        v-for="item in messageList"
        :key="item.id"
        class="space-y-3 transition rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
        @click="emit('select', item)"
      >
        <p class="text-sm">{{ item.title }}</p>
        <p class="flex gap-1">
          <n-tag v-for="tag in item.tag" :key="tag" size="tiny" round type="info">{{ tag }}</n-tag>
        </p>
      </div>
    </div>
  </n-scrollbar>
</template>
