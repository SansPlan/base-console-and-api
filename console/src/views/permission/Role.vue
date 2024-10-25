<script setup lang="ts">
const value = ref('')
</script>

<template>
  <main>
    <div class="w-48 p-4">
      <p>角色管理</p>
      <n-input v-model:value="value" />
    </div>
  </main>
</template>
