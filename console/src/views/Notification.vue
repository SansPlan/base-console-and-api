<script setup lang="ts">
import { NotificationList, NotificationDrawer, type MessageItem } from '@/components/notification'

const messageDetail = ref<MessageItem | null>(null)
</script>

<template>
  <main class="h-pageHeight data-[tabbar=true]:h-pageHeight2 flex flex-col">
    <div class="flex items-center gap-3 px-3 lg:hidden h-navbar bg-zinc-50 dark:bg-zinc-800">
      <NotificationDrawer @select="(item: MessageItem) => (messageDetail = item)" />
    </div>
    <div class="flex flex-grow overflow-hidden divide-x">
      <NotificationList class="hidden lg:block" @select="(item: MessageItem) => (messageDetail = item)" />
      <n-scrollbar class="flex-grow bg-white dark:bg-zinc-900">
        <n-empty v-if="!messageDetail" description="未选择消息" class="p-32" />
        <template v-else>
          <div class="px-4 py-3">
            <h2 class="mb-4 text-3xl">{{ messageDetail.title }}</h2>
            <p class="mb-3">{{ messageDetail.descript }}</p>
            <p class="flex flex-wrap gap-3">
              <a :href="messageDetail.href" class="inline-flex items-center gap-1">
                <span>访问链接</span>
                <Icon icon="akar-icons:link-out" />
              </a>
              <n-tag v-for="tag in messageDetail.tag" :key="tag" type="info" round>{{ tag }}</n-tag>
            </p>
            <n-divider />
            <div>{{ messageDetail.content }}</div>
          </div>
        </template>
      </n-scrollbar>
    </div>
  </main>
</template>
