<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <main class="px-4 py-12 lg:p-44 bg-dot-grid">
    <h2 class="flex flex-wrap items-center font-semibold">
      <span class="text-3xl">未找到组件：</span>
      <small class="p-1.5 rounded text-lg bg-white dark:bg-black">/src/views/{{ route.meta.componentPath }}.vue</small>
    </h2>
    <div class="my-5">
      <p>请根据以下常见问题进行筛查：</p>
    </div>
    <ul class="pl-4 space-y-1 text-sm list-decimal md:pl-8">
      <li>请检查菜单按钮上填写的组件路径是否错误</li>
      <li>请比对本地项目文件和开源仓库文件是否一致（该筛查方式仅限于开源文件）</li>
      <li>请按 F12 打开控制台是否发现报错信息</li>
      <li>请检查 <n-tag type="primary" size="small" class="font-semibold" round>useAuthorize</n-tag> 状态管理文件中路由载入的函数是否发生变更</li>
      <li>请提交 <n-tag type="primary" size="small" class="font-semibold" round>issue</n-tag> 联系开发者或到相关交流社区请求帮助</li>
    </ul>
  </main>
</template>
