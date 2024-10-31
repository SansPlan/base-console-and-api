import { useAuthorize } from '@/stores/useAuthorize'
import type { Router } from 'vue-router'
import { useThemeColor } from '@/composables/useThemeColor'
import { useAppConfig } from '@/stores/useAppConfig'
import { LOGIN_PAGE } from '@/constants'

export const useGuard = (router: Router) => {
  const { loadingBar } = useThemeColor()
  router.beforeEach(async (to, from) => {
    loadingBar.start()

    const authorize = useAuthorize()
    const appConfig = useAppConfig()

    if (to.name !== LOGIN_PAGE.name) {
      if (to.meta?.requiresAuth && !authorize.token) {
        return { name: LOGIN_PAGE.name }
      } else {
        if (!authorize.isInstallRoutes) {
          await authorize.withInstallMenu(router)
          return to.fullPath
        }
      }

      const label: string = (to.meta?.title as string) || 'Unnamed'
      document.title = `${label} | ${appConfig.siteName} (${appConfig.devSource})`
      appConfig.pushTabItem({
        label,
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
