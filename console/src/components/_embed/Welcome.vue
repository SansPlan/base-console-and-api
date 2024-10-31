<script setup lang="ts">
import { SUpdateLog } from '.'

import { useAppConfig } from '@/stores/useAppConfig'

interface CloudActivity {
  title: string
  badge: string
  href: string
}

const appConfig = useAppConfig()

const cloudServiceActivity: CloudActivity[] = [
  { title: '通义灵码_智能编码助手', badge: '阿里', href: 'https://tongyi.aliyun.com/lingma/pricing?userCode=rvhutp2k' },
  { title: '阿里云 "99计划" 新老同享', badge: '阿里', href: 'https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=rvhutp2k' },
  { title: '云工开物_阿里云高校计划', badge: '阿里', href: 'https://university.aliyun.com/mobile?userCode=rvhutp2k' },
  { title: '【腾讯云】云服务器、云数据库、COS、CDN、短信等云产品特惠热卖中', badge: '腾讯', href: 'https://curl.qcloud.com/YsfVFisM' },
  { title: '【腾讯云】腾讯云数智人专享折扣！新用户3折，新老同享7折！助力内容创作、企业降本增效！', badge: '腾讯', href: 'https://curl.qcloud.com/gu3h0HSr' },
  { title: '【腾讯云】Lighthouse助力跨境电商业务扬帆出海', badge: '腾讯', href: 'https://curl.qcloud.com/g2RSCOaU' },
  { title: '【腾讯云】即时通信IM接入AI服务，高效构建智能聊天能力', badge: '腾讯', href: 'https://curl.qcloud.com/AqH4VRww' },
  {
    title: '【腾讯云】腾讯云图，像PPT一样简单的数据可视化工具。5元搞定数据可视化，模板丰富，拖拖拽拽就能做出好看的可视化大屏。',
    badge: '腾讯',
    href: 'https://curl.qcloud.com/RJ5Elol0',
  },
]
</script>

<template>
  <main class="bg-white dark:bg-zinc-900">
    <section class="py-8 mb-4 lg:mb-8 lg:pb-12 lg:pt-16 bg-dot-grid bg-zinc-100/80 dark:bg-zinc-950">
      <div class="max-w-6xl px-4 mx-auto lg:px-8">
        <h1 class="flex items-center gap-3 text-2xl font-semibold">
          <span>欢迎回来！</span>
          <span>Guest</span>
          <Icon icon="mdi:applause" class="text-orange-500" />
        </h1>
        <div class="space-y-1 mt-7">
          <p>{{ appConfig.siteName }} 为您提供快速开发业务而无需担心权限分配问题。</p>
          <br />
          <p class="flex items-center gap-1 mb-2">
            <span>开源仓库 <em>(MIT 协议)</em>：</span>
            <a href="" target="_blank">
              <n-button quaternary circle>
                <Icon icon="simple-icons:gitee" width="20" class="text-red-600" />
              </n-button>
            </a>
            <a href="https://github.com/IncreaseExp/learn-permission-control-admin" target="_blank">
              <n-button quaternary circle>
                <Icon icon="simple-icons:github" width="20" />
              </n-button>
            </a>
          </p>
          <br />
          <p class="flex flex-wrap items-center gap-3">
            <router-link to="/dashboard">
              <n-button type="primary">
                <template #icon>
                  <Icon icon="streamline:startup-solid" width="14" />
                </template>
                开始使用
              </n-button>
            </router-link>
            <SUpdateLog />
          </p>
        </div>
      </div>
    </section>
    <section class="max-w-6xl px-4 py-2 mx-auto space-y-4 lg:p-8">
      <h3 class="text-xl font-semibold">云服务优惠推荐</h3>
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <li v-for="item in cloudServiceActivity" :key="item.href" class="flex flex-col p-3 transition border rounded dark:border-zinc-700 hover:shadow-lg">
          <div class="flex-grow mb-4">
            <p>{{ item.title }}</p>
          </div>
          <p class="flex items-center justify-between">
            <n-tag type="info" size="small">{{ item.badge }}</n-tag>
            <a :href="item.href" target="_blank">
              <n-button type="primary" size="small">访问链接</n-button>
            </a>
          </p>
        </li>
      </ul>
    </section>
    <footer class="py-6 text-sm text-center text-zinc-500">
      <p>Copyright &copy;2024 {{ appConfig.siteName }} ({{ appConfig.devSource }})</p>
    </footer>
  </main>
</template>
