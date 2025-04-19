<script setup lang="ts">
import { useAuthStore } from '@/store'
import IconLogout from '~icons/icon-park-outline/logout'

const { t } = useI18n()

const { userInfo, logout } = useAuthStore()
const router = useRouter()

const options = computed(() => {
  return [
    {
      label: t('app.loginOut'),
      key: 'loginOut',
      icon: () => h(IconLogout),
    },
  ]
})
function handleSelect(key: string | number) {
  if (key === 'loginOut') {
    window.$dialog?.info({
      title: t('app.loginOutTitle'),
      content: t('app.loginOutContent'),
      positiveText: t('common.confirm'),
      negativeText: t('common.cancel'),
      onPositiveClick: () => {
        logout()
      },
    })
  }
  if (key === 'userCenter')
    router.push('/userCenter')

  if (key === 'guthub')
    window.open('https://github.com/chansee97/nova-admin')

  if (key === 'gitee')
    window.open('https://gitee.com/chansee97/nova-admin')

  if (key === 'docs')
    window.open('https://nova-admin-docs.pages.dev/')
}
</script>

<template>
  <NDropdown
    trigger="click"
    :options="options"
    @select="handleSelect"
  >
    <NAvatar
      round
      class="cursor-pointer"
      :src="userInfo?.avatar"
    >
      <template #fallback>
        <div class="wh-full flex-center">
          <IconParkOutlineUser />
        </div>
      </template>
    </NAvatar>
  </NDropdown>
</template>

<style scoped></style>
