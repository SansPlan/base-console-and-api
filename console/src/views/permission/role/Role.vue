<script lang="ts">
export default {
  name: 'PermissionRole',
}
</script>

<script setup lang="ts">
const searchRole = ref<string>('')
const roles = ref<any[]>(
  Array.from({ length: 36 }, (_, index) => ({
    id: index + 1,
    name: `Role/${index + 1}`,
    descript: 'Role 角色赋予随机用户，这只是一个普通的标识，没有任何权限',
  })),
)
</script>

<template>
  <main class="p-4 space-y-4">
    <fieldset class="px-4 py-3 bg-white border rounded-lg dark:bg-zinc-900 dark:border-zinc-800">
      <legend class="text-base">
        <p class="flex items-center gap-1">
          <Icon icon="ic:outline-tips-and-updates" class="text-orange-500" width="16" />
          <span>角色权限赋予</span>
        </p>
      </legend>
      <div>
        <p>本来还想着做复杂一些的，比如角色组、组织树等，但一想这只是一个普通的后台模板，用不上</p>
      </div>
    </fieldset>
    <div class="flex items-center justify-between">
      <n-form inline label-placement="left" :show-feedback="false">
        <n-form-item>
          <n-input v-model:value="searchRole" placeholder="查找角色" clearable />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" circle>
            <Icon icon="mi:search" width="18" />
          </n-button>
        </n-form-item>
      </n-form>
      <n-button type="primary">
        <template #icon>
          <Icon icon="oui:app-users-roles" width="16" />
        </template>
        新建角色
      </n-button>
    </div>
    <ul class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      <li v-for="item in roles" :key="item.id">
        <div class="flex flex-col gap-2 p-3 rounded bg-zinc-50 dark:bg-zinc-800">
          <p class="text-sm font-semibold">{{ item.name }}</p>
          <div class="flex-grow">
            {{ item.descript }}
          </div>
          <div class="flex items-center justify-end gap-2">
            <n-button quaternary type="error" size="small">删除</n-button>
            <n-button quaternary type="primary" size="small">编辑</n-button>
          </div>
        </div>
      </li>
    </ul>
  </main>
</template>
