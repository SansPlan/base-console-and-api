<script setup lang="ts">
import { AppModal } from '.'

const withShortcut = ref<boolean>(true)
</script>

<template>
  <AppModal :shortcut="withShortcut" v-slot="{ toggleModal }">
    <div
      class="hidden mx-3 transition rounded-full cursor-pointer h-9 lg:block min-w-40 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600"
      @click="toggleModal()"
    >
      <div class="flex items-center h-full gap-1 px-2 text-zinc-400">
        <Icon icon="prime:search" width="18" />
        <p class="mr-3 whitespace-nowrap">搜索点什么</p>
        <span v-if="withShortcut" class="p-1 text-xs rounded bg-zinc-100 dark:bg-zinc-950">Ctrl+Space</span>
      </div>
    </div>
    <div class="lg:hidden">
      <n-button circle quaternary @click="toggleModal()">
        <Icon icon="prime:search" width="18" />
      </n-button>
    </div>
  </AppModal>
</template>
