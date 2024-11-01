<template>
  <div class="p-4 lg:p-40">
    <div class="mx-auto text-zinc-600 dark:text-zinc-300">
      <h1 class="flex items-center gap-4">
        <Icon icon="octicon:unlink-16" width="50" />
        <span class="font-mono text-6xl">404</span>
      </h1>
      <div class="my-6 space-y-2">
        <p>
          您正在访问的地址为: <span class="ml-2 font-semibold text-black">{{ $route.fullPath }}</span>
        </p>
        <br />
        <p>该地址不可访问的可能原因如下：</p>
        <ul class="pl-8 text-black list-decimal dark:text-white">
          <li>无权限访问</li>
          <li>项目更新未调整跳转路由</li>
          <li>路由不存在</li>
          <li>组件不存在</li>
        </ul>
      </div>
      <br />
      <p class="flex items-center gap-3">
        <n-button type="primary" @click="$router.back()">
          <template #icon>
            <Icon icon="lets-icons:back" />
          </template>
          返回上一页
        </n-button>
        <router-link to="/">
          <n-button quaternary type="primary">
            <template #icon>
              <Icon icon="flowbite:home-outline" />
            </template>
            首页
          </n-button>
        </router-link>
      </p>
    </div>
  </div>
</template>
