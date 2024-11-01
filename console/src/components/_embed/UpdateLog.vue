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
    <n-drawer-content closable header-class="!border-none h-header" :native-scrollbar="false">
      <template #header>
        <h3 class="flex items-center gap-3 text-base font-semibold">
          <Icon icon="mdi:calendar-time" width="20" />
          <span>更新日志</span>
        </h3>
      </template>
      <div class="space-y-6">
        <section class="space-y-2">
          <h3 class="flex items-center gap-2 text-base font-semibold">
            <Icon icon="mingcute:version-line" class="text-blue-500" width="20" />
            <span>v0.0.2</span>
          </h3>
          <ul class="pl-10 space-y-1 list-decimal">
            <li>完善页面 权限管理->菜单按钮</li>
            <li>新增搜索窗口</li>
            <li>修复本地个性化设置问题</li>
          </ul>
        </section>
        <section class="space-y-2">
          <h3 class="flex items-center gap-2 text-base font-semibold">
            <Icon icon="mingcute:version-line" class="text-blue-500" width="20" />
            <span>v0.0.1</span>
          </h3>
          <ul class="pl-10 space-y-1 list-decimal">
            <li>初始化项目 (Project/Git 仓库)</li>
            <li>
              <n-highlight text="在 Dribbble 平台获取 UI 参考，在某些组件上借鉴 Youtube" :patterns="['Dribbble', 'Youtube']" />
            </li>
            <li>扩展小部分组件</li>
            <li>支持本地个性化设置</li>
            <li>支持 KeepAlive 缓存</li>
          </ul>
        </section>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
