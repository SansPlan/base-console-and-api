import { useAuthorize } from '@/stores/useAuthorize'
import type { Router } from 'vue-router'
import { loadingBar } from '@/lib/naive-ui'
import { useAppConfig } from '@/stores/useAppConfig'

export const LOGIN_PAGE = 'oi.login'

export const useGuard = (router: Router) => {
  router.beforeEach(async (to, from) => {
    loadingBar.start()

    const authorize = useAuthorize()
    const appConfig = useAppConfig()

    if (to.name !== LOGIN_PAGE) {
      if (to.meta?.requireAuth && !authorize.TOKEN) {
        return { name: LOGIN_PAGE }
      } else {
        if (!authorize.installRoutes) {
          await authorize.withInstallMenu(router)
          return to.fullPath
        }
      }

      appConfig.pushTabItem({
        label: (to.meta?.title as string) || '未命名',
        to: { name: to.name as string },
      })
    }
  })

  router.afterEach(() => loadingBar.finish())

  return router
}
