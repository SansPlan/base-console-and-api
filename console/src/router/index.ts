import { createRouter, createWebHistory } from 'vue-router'
import { useGuard } from './useGuard'

export const DEFAULT_LAYOUT_COMPONENT = () => import('@/layouts/Default.vue')
export const NOT_FOUND_COMPONENT = () => import('@/views/NotFound.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LearnMainView',
      meta: {
        requireAuth: true,
      },
      component: DEFAULT_LAYOUT_COMPONENT,
    },
    {
      path: '/login',
      name: 'LearnLogin',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'LearnNotFound',
      component: NOT_FOUND_COMPONENT,
    },
  ],
})

useGuard(router)

export default router
