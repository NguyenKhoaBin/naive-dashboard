import type { Router } from 'vue-router'
import { useAppStore, useRouteStore, useTabStore } from '@/store'
import { local } from '@/utils'

const title = import.meta.env.VITE_APP_NAME

export function setupRouterGuard(router: Router) {
  const appStore = useAppStore()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()

  router.beforeEach(async (to, from, next) => {
    // Check if it's an external link, open it in a new tab and block navigation
    if (to.meta.href) {
      window.open(to.meta.href)
      return false
    }
    // Start the loadingBar
    appStore.showProgress && window.$loadingBar?.start()

    // Check if there is a TOKEN, perform login authentication
    const isLogin = Boolean(local.get('accessToken'))
    if (!isLogin) {
      if (to.name === 'login')
        next()

      if (to.name !== 'login') {
        const redirect = to.name === '404' ? undefined : to.fullPath
        next({ path: '/login', query: { redirect } })
      }
      return false
    }

    // Check if the routes have been initialized
    if (!routeStore.isInitAuthRoute) {
      await routeStore.initAuthRoute()
      // After loading dynamic routes, return to the original route
      if (to.name === '404') {
        // Wait for permission routes to load, then return to the previous route, otherwise 404
        next({
          path: to.fullPath,
          replace: true,
          query: to.query,
          hash: to.hash,
        })
        return false
      }
    }

    // Check if on the login page, redirect to the home page
    if (to.name === 'login') {
      next({ path: '/' })
      return false
    }

    next()
  })

  router.beforeResolve((to) => {
    // Set the active menu
    routeStore.setActiveMenu(to.meta.activeMenu ?? to.fullPath)
    // Add the tab to the list
    tabStore.addTab(to)
    // Set the current tab
    tabStore.setCurrentTab(to.fullPath as string)
  })

  router.afterEach((to) => {
    // Update the webpage title
    document.title = `${to.meta.title} - ${title}`
    // Finish the loadingBar
    appStore.showProgress && window.$loadingBar?.finish()
  })
}
