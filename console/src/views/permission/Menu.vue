<script lang="ts">
export default {
  name: 'LearnPermissionMenu',
}
</script>

<script setup lang="ts">
import Menu from './Role.vue'
import RoleGroup from './RoleGroup.vue'

const current = shallowRef(Menu)
</script>

<template>
  <main class="p-4">
    <n-button @click="current = Menu">Menu</n-button>
    <n-button @click="current = RoleGroup">RoleGroup</n-button>

    <keep-alive>
      <component :is="current" />
    </keep-alive>
  </main>
</template>
