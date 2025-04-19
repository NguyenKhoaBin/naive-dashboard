import { router } from '@/router'
import { fetchLogin } from '@/service'
import { local } from '@/utils'
import { useRouteStore } from './router'
import { useTabStore } from './tab'
import { defineStore } from 'pinia'
import { computed, reactive, ref, unref } from 'vue'

export const useAuthStore = defineStore('auth-store', () => {
  const userInfo = reactive<any>(local.get('userInfo') || { })
  const token = ref(local.get('accessToken') || '')

  const isLogin = computed(() => Boolean(token.value))

  function clearAuthStorage() {
    local.remove('accessToken')
    local.remove('refreshToken')
    local.remove('userInfo')
  }

  async function logout() {
    const route = unref(router.currentRoute)
    clearAuthStorage()
    const routeStore = useRouteStore()
    routeStore.resetRouteStore()
    const tabStore = useTabStore()
    tabStore.clearAllTabs()
    token.value = ''
    Object.assign(userInfo, { })
    if (route.meta.requiresAuth) {
      router.push({
        name: 'login',
        query: {
          redirect: route.fullPath,
        },
      })
    }
  }

  async function login(userName: string, password: string) {
    try {
      const { isSuccess, data } = await fetchLogin({ userName, password })
      if (!isSuccess)
        return
      await handleLoginInfo(data)
    }
    catch (e) {
      console.warn('[Login Error]:', e)
    }
  }

  // Hàm xử lý thông tin sau đăng nhập
  async function handleLoginInfo(data: Api.Login.Info) {
    local.set('userInfo', data)
    local.set('accessToken', data.accessToken)
    local.set('refreshToken', data.refreshToken)
    token.value = data.accessToken
    Object.assign(userInfo, data)
    const routeStore = useRouteStore()
    await routeStore.initAuthRoute()
    const route = unref(router.currentRoute)
    const query = route.query as { redirect: string }
    router.push({
      path: query.redirect || '/',
    })
  }

  return {
    userInfo,
    token,
    isLogin,
    logout,
    login,
    handleLoginInfo,
    clearAuthStorage,
  }
})
