<script setup lang="ts">
import SankeyExample from './components/SankeyExample.vue'
</script>

<template>
  <main class="h-pageHeight data-[tabbar]:h-pageHeight2 p-3">
    <section class="gap-3 lg:flex">
      <div class="flex-1 flex-shrink-0 p-2 bg-white border rounded-md dark:bg-zinc-900 min-h-96 dark:border-zinc-800">
        <SankeyExample />
      </div>
      <div class="flex-1 flex-shrink-0 p-2 bg-white border rounded-md dark:bg-zinc-900 min-h-96 dark:border-zinc-800">
        <SankeyExample />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
export default {
  name: 'LearnDashboard',
}
</script>
