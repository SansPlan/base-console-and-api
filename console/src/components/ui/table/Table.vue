<script setup lang="ts">
import { LTableColumns, LTableProps } from '.'

const props = defineProps<typeof LTableProps>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-end gap-3">
      <div class="flex-grow">
        <slot />
      </div>
      <div class="flex-shrink-0">
        <LTableColumns />
      </div>
    </div>
    <n-data-table />
  </div>
</template>
