<script setup lang="ts">
import { AppModal } from '.'

const withShortcut = ref<boolean>(true)
</script>

<template>
  <AppModal :shortcut="withShortcut" v-slot="{ toggleModal }">
    <div class="hidden lg:block min-w-40 h-8 rounded-md transition hover:bg-zinc-100 cursor-pointer dark:hover:bg-zinc-950" @click="toggleModal()">
      <div class="h-full flex items-center gap-1 px-2 text-zinc-400">
        <Icon icon="prime:search" width="18" />
        <p class="whitespace-nowrap mr-3">搜索点什么</p>
        <span v-if="withShortcut" class="text-xs bg-zinc-100 dark:bg-zinc-950 p-1 rounded">Ctrl+Space</span>
      </div>
    </div>
    <div class="lg:hidden">
      <n-button circle quaternary @click="toggleModal()">
        <Icon icon="prime:search" width="18" />
      </n-button>
    </div>
  </AppModal>
</template>
