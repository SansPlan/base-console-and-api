import { createRouter, createWebHistory } from 'vue-router'
import { useGuard } from './useGuard'
import { routes } from '@/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

useGuard(router)

export default router
