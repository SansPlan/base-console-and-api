<script lang="ts">
export default {
  name: 'IePermissionRole',
}
</script>

<script setup lang="ts">
const inputRef = ref('')
</script>

<template>
  <main>
    <div class="w-48 p-4">
      <p>角色管理</p>
      <n-input v-model:value="inputRef" />
    </div>
  </main>
</template>
