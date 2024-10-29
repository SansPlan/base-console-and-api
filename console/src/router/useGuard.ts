import { useAuthorize } from '@/stores/useAuthorize'
import type { Router } from 'vue-router'
// import { loadingBar } from '@/lib/naive-ui'
import { useThemeColor } from '@/composables/useThemeColor'
import { useAppConfig } from '@/stores/useAppConfig'

export const LOGIN_PAGE = 'LearnLogin'

export const useGuard = (router: Router) => {
  const { loadingBar } = useThemeColor()
  router.beforeEach(async (to, from) => {
    loadingBar.start()

    const authorize = useAuthorize()
    const appConfig = useAppConfig()

    if (to.name !== LOGIN_PAGE) {
      if (to.meta?.requiresAuth && !authorize.token) {
        return { name: LOGIN_PAGE }
      } else {
        if (!authorize.isInstallRoutes) {
          await authorize.withInstallMenu(router)
          return to.fullPath
        }
      }

      appConfig.pushTabItem({
        label: (to.meta?.title as string) || '未命名',
        name: to.name,
        keepAlive: (to.meta?.keepAlive as boolean) || false,
        icon: (to.meta.icon as string) || '',
        to,
      })
    }
  })

  router.afterEach(() => {
    loadingBar.finish()
  })

  return router
}
