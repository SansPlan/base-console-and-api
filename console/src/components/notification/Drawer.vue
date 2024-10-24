<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { NotificationList } from '.'
import type { MessageItem } from '.'

const emit = defineEmits(['select'])

const showDrawer = ref<boolean>(false)
const toggleDrawer = useToggle(showDrawer)

function emitMessage(item: MessageItem) {
  emit('select', item)
  toggleDrawer()
}
</script>

<template>
  <n-button quaternary circle @click="toggleDrawer()">
    <Icon icon="carbon:message-queue" width="18" />
  </n-button>

  <n-drawer v-model:show="showDrawer" class="!w-[296px]">
    <n-drawer-content closable header-class="h-header" :native-scrollbar="false">
      <template #header>
        <h3 class="text-base font-semibold">消息列表</h3>
      </template>
      <NotificationList @select="emitMessage" />
    </n-drawer-content>
  </n-drawer>
</template>
