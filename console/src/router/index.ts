import { createRouter, createWebHistory } from 'vue-router'
import { useGuard } from './useGuard'

export const DEFAULT_LAYOUT_COMPONENT = () => import('@/layouts/Default.vue')
export const NOT_FOUND_COMPONENT = () => import('@/views/NotFound.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'IeMainView',
      meta: {
        requiresAuth: true,
      },
      component: DEFAULT_LAYOUT_COMPONENT,
    },
    {
      path: '/login',
      name: 'IeLogin',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'IeNotFound',
      component: NOT_FOUND_COMPONENT,
    },
  ],
})

useGuard(router)

export default router
