<script setup lang="ts">
import { type TabItem, useAppConfig } from '@/stores/useAppConfig'

interface Prop {
  tab: TabItem
  noClosable: boolean
  isActive: boolean
}

defineProps<Prop>()
const emit = defineEmits(['select', 'close'])
</script>

<template>
  <div class="flex items-center transition rounded" :class="isActive ? 'bg-zinc-100' : 'hover:bg-zinc-100'">
    <p class="px-2 py-1 text-[0.8125rem] cursor-pointer" @click="emit('select', tab)">{{ tab.label }}</p>
    <span v-if="!noClosable" class="p-1 -ml-1 transition rounded cursor-pointer hover:bg-zinc-200 hover:text-red-500" @click="emit('close')">
      <Icon icon="mi:close" width="16" />
    </span>
  </div>
</template>
