import type { TabItem } from '@/stores/useAppConfig'

export const DEFAULT_LAYOUT_COMPONENT = () => import('@/layouts/Default.vue')
export const NOT_FOUND_COMPONENT = () => import('@/views/NotFound.vue')

export const MAIN_VIEW = {
  path: '/',
  name: 'MainView',
  meta: {
    requiresAuth: true,
  },
  component: DEFAULT_LAYOUT_COMPONENT,
}

export const LOGIN_PAGE = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login.vue'),
}

export const NOT_FOUND_PAGE = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NOT_FOUND_COMPONENT,
}

export const routes = [MAIN_VIEW, LOGIN_PAGE, NOT_FOUND_PAGE]

export const FIXED_TABLE_ITEM: TabItem = {
  label: '欢迎页',
  name: 'Welcome',
  keepAlive: false,
  to: { name: 'Welcome' },
}
