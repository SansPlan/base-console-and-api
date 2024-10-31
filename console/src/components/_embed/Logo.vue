<script setup lang="ts">
withDefaults(
  defineProps<
    Partial<{
      size: number
    }>
  >(),
  {
    size: 18,
  },
)
</script>

<template>
  <svg
    class="stroke-black dark:stroke-white"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="size"
    :height="size"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path stroke-width="2" d="M3 15L15 3" />
    <path stroke-width="2" d="M4 9L4 4L9 4" />
    <path stroke-width="2" d="M14 9L14 14L9 14" />
  </svg>
</template>
