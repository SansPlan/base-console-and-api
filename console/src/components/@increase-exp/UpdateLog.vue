<script setup lang="ts">
const showLog = ref<boolean>(false)
</script>

<template>
  <n-button quaternary @click="showLog = true">
    <template #icon>
      <Icon icon="mingcute:timeline-fill" />
    </template>
    更新日志
  </n-button>

  <n-drawer v-model:show="showLog" class="!w-[580px] max-w-[80vw]">
    <n-drawer-content closable header-style="--n-header-padding: 12px 18px" header-class="h-header">
      <template #header>
        <h3 class="text-sm font-semibold">更新日志</h3>
      </template>
      <div class="divide-y divide-zinc-100">
        <section class="py-2 space-y-2">
          <h3 class="flex items-center gap-2 text-base font-semibold">
            <Icon icon="ic:outline-tips-and-updates" class="text-blue-500" width="18" />
            <span>v0.0.1</span>
          </h3>
          <ul class="pl-10 list-decimal">
            <li>初始化项目</li>
            <li>初始化项目</li>
            <li>初始化项目</li>
            <li>初始化项目</li>
          </ul>
        </section>
        <section class="py-2 space-y-2">
          <h3 class="flex items-center gap-2 text-base font-semibold">
            <Icon icon="ic:outline-tips-and-updates" class="text-blue-500" width="18" />
            <span>v0.0.1</span>
          </h3>
          <ul class="pl-10 list-decimal">
            <li>初始化项目</li>
            <li>初始化项目</li>
            <li>初始化项目</li>
            <li>初始化项目</li>
          </ul>
        </section>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
