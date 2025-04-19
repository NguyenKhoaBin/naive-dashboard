<script lang="ts" setup>
import { useAppStore, useRouteStore } from '@/store'
import {
  BackTop,
  Breadcrumb,
  CollapaseButton,
  Logo,
  Menu,
  Setting,
  TabBar,
  UserCenter,
} from './components'

const routeStore = useRouteStore()
const appStore = useAppStore()
</script>

<template>
  <NLayout
    has-sider
    class="wh-full"
    embedded
  >
    <NLayoutSider
      v-if="!appStore.contentFullScreen"
      bordered
      :collapsed="appStore.collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      content-style="display: flex;flex-direction: column;min-height:100%;"
    >
      <Logo v-if="appStore.showLogo" />
      <NScrollbar class="flex-1">
        <Menu />
      </NScrollbar>
    </NLayoutSider>
    <NLayout
      class="h-full flex flex-col"
      content-style="display: flex;flex-direction: column;min-height:100%;"
      embedded
      :native-scrollbar="false"
    >
      <NLayoutHeader bordered position="absolute" class="z-999">
        <div v-if="!appStore.contentFullScreen" class="h-60px flex-y-center justify-between">
          <div class="flex-y-center h-full">
            <CollapaseButton />
            <Breadcrumb />
          </div>
          <div class="flex-y-center gap-1 h-full p-x-xl">
            <!-- <Search /> -->
            <!-- <Notices /> -->
            <DarkModeSwitch />
            <LangsSwitch />
            <Setting />
            <UserCenter />
          </div>
        </div>
        <TabBar v-if="appStore.showTabs" class="h-45px" />
      </NLayoutHeader>
      <!-- 121 = 16 + 45 + 60 45 is the height of the breadcrumb, 60 is the height of the header -->
      <!-- 56 = 16 + 40 40 is the height of the footer -->
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
          <Transition
            :name="appStore.transitionAnimation"
            mode="out-in"
          >
            <KeepAlive :include="routeStore.cacheRoutes">
              <component
                :is="Component"
                v-if="appStore.loadFlag"
                :key="route.fullPath"
              />
            </KeepAlive>
          </Transition>
        </RouterView>
      </div>
      <NLayoutFooter
        v-if="appStore.showFooter && !appStore.contentFullScreen"
        bordered
        position="absolute"
        class="h-40px flex-center"
      >
        {{ appStore.footerText }}
      </NLayoutFooter>
      <BackTop />
    </NLayout>
  </NLayout>
</template>
