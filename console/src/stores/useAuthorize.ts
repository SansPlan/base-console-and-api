import { convertListToTree } from '@/lib/tree'
import type { Router, RouteRecordNameGeneric, RouteRecordRaw } from 'vue-router'
import routes from '@/router/routes.json'
import { MAIN_VIEW, NOT_FOUND_COMPONENT } from '@/constants'

interface AuthorizeState {
  // 登录凭证
  token: string
  // 授权用户信息
  userInfo: ObjectAny
  // 原始菜单
  menuRaw: any[]
  // 授权菜单树
  menuTree: any[]
  // 安装的路由
  installRoutes: RouteRecordRaw[]
  // 路由是否已经安装
  isInstallRoutes: boolean
}

interface AuthroizeActions {
  // 验证 token 是否过期
  verifyTokenHasExpired: () => void
  // 获取授权菜单
  getAuthorizeMenu: () => void
  // 安装授权菜单
  withInstallMenu: (router: Router) => Promise<boolean>
  // 卸载授权路由
  uninstallRouteMenus: (router: Router) => void
  // 退出登录
  withLogout: (router: Router) => void
}

export const useAuthorize = defineStore<string, AuthorizeState, ObjectAny, AuthroizeActions>('authorize', {
  state: () => ({
    token: 'test',
    userInfo: {},
    menuRaw: [],
    menuTree: [],
    installRoutes: [],
    isInstallRoutes: false,
  }),
  actions: {
    async verifyTokenHasExpired() {},

    async getAuthorizeMenu() {
      this.menuRaw = routes
      this.menuTree = convertListToTree(routes, MAIN_VIEW.name)
    },

    async withInstallMenu(router: Router) {
      return new Promise<boolean>(async (resolve, reject) => {
        // 将路由树追加到路由
        if (!this.menuTree.length) {
          this.getAuthorizeMenu()
        }
        try {
          this.installRoutes = mapInstallMenu(router, this.menuRaw)
          this.isInstallRoutes = true
          resolve(true)
        } catch (error) {
          reject(false)
        }
      })
    },

    uninstallRouteMenus(router: Router) {
      if (this.installRoutes.length) {
        this.installRoutes.forEach((item: RouteRecordRaw) => router.removeRoute(item.name as NonNullable<RouteRecordNameGeneric>))
        this.installRoutes = []
      }
    },

    withLogout(router: Router) {
      this.token = ''
      this.userInfo = {}
      this.menuRaw = []
      this.menuTree = []
      this.isInstallRoutes = false
      this.uninstallRouteMenus(router)
    },
  },
  // persist: {
  //   pick: ['token', 'userInfo', 'menu'],
  // },
})

// 递归授权路由树到路由
const viewModules = import.meta.glob('/src/views/**/*.{vue,tsx}')

function mapInstallMenu(router: Router, menus: ObjectAny[]): RouteRecordRaw[] {
  return menus
    .filter(item => item.type === 'menu')
    .map(item => {
      let component = viewModules[`/src/views/${formatPath(item.componentPath)}.vue`]
      if (!component) {
        component = NOT_FOUND_COMPONENT
      }
      const route: RouteRecordRaw = {
        path: formatPath(item.routerPath),
        name: item.name,
        meta: {
          requiresAuth: item.requiresAuth,
          title: item.title,
          icon: item.icon,
          showAside: item.showAside,
          keepAlive: item.keepAlive,
        },
        component,
      }
      if (item.redirect) {
        route.redirect = item.redirect
      }
      router.addRoute(MAIN_VIEW.name, route)
      return route
    })
}

// 处理路由
// 由于都是追加到 IeMainView 的子集里面，因此路由左侧不能够有符号 /
// 当然顺手把右边的符号 / 也一起移除掉
function formatPath(path: string) {
  return path.replace(/^\/+|\/+$/g, '')
}
