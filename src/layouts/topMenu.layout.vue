<script lang="ts" setup>
import { useAppStore, useRouteStore } from '@/store'
import {
  BackTop,
  FullScreen,
  Logo,
  Menu,
  Notices,
  Search,
  Setting,
  TabBar,
  UserCenter,
} from './components'

const routeStore = useRouteStore()
const appStore = useAppStore()
</script>

<template>
  <NLayout class="wh-full" embedded>
    <NLayout
      class="h-full flex flex-col" content-style="display: flex;flex-direction: column;min-height:100%;"
      embedded :native-scrollbar="false"
    >
      <NLayoutHeader bordered position="absolute" class="z-999">
        <div v-if="!appStore.contentFullScreen" class="h-60px flex-y-center justify-between shrink-0">
          <Logo v-if="appStore.showLogo" />
          <Menu mode="horizontal" responsive />
          <div class="flex-y-center gap-1 h-full p-x-xl">
            <Search />
            <Notices />
            <FullScreen />
            <DarkModeSwitch />
            <LangsSwitch />
            <Setting />
            <UserCenter />
          </div>
        </div>
        <TabBar v-if="appStore.showTabs" class="h-45px" />
      </NLayoutHeader>
      <div
        class="flex-1 p-16px flex flex-col"
        :class="{
          'p-t-121px': appStore.showTabs,
          'p-b-56px': appStore.showFooter && !appStore.contentFullScreen,
          'p-t-76px': !appStore.showTabs,
          'p-t-61px': appStore.contentFullScreen,
        }"
      >
        <RouterView v-slot="{ Component, route }" class="flex-1">
          <Transition :name="appStore.transitionAnimation" mode="out-in">
            <KeepAlive :include="routeStore.cacheRoutes">
              <component :is="Component" v-if="appStore.loadFlag" :key="route.fullPath" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </div>
      <NLayoutFooter
        v-if="appStore.showFooter && !appStore.contentFullScreen"
        bordered position="absolute" class="h-40px flex-center"
      >
        {{ appStore.footerText }}
      </NLayoutFooter>
      <BackTop />
    </NLayout>
  </NLayout>
</template>
