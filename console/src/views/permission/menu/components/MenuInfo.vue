<script setup lang="ts">
import { useCloned } from '@vueuse/core'

interface MenuInfoProp {
  options: ObjectAny | null
  type: string
}

const props = defineProps<MenuInfoProp>()

const { cloned, sync } = useCloned({})

function resolveMenuInfo() {
  const { type, options } = props
  console.log(options)
}

watch(props, resolveMenuInfo)
</script>

<template>
  <div class="p-3">
    <template v-if="!options">
      <n-empty description="请从左侧选择父级菜单" class="py-32" />
    </template>
    <template v-else>{{ options }}</template>
  </div>
</template>
