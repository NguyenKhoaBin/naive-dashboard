<script setup lang="ts">
import { useAppStore } from '@/store'
import IconAuto from '~icons/icon-park-outline/laptop-computer'
import IconMoon from '~icons/icon-park-outline/moon'
import IconSun from '~icons/icon-park-outline/sun-one'
import { NFlex } from 'naive-ui'

const { t } = useI18n()

const appStore = useAppStore()

const options = computed(() => {
  return [
    {
      label: t('app.light'),
      value: 'light',
      icon: IconSun,
    },
    {
      label: t('app.dark'),
      value: 'dark',
      icon: IconMoon,
    },
    {
      label: t('app.system'),
      value: 'auto',
      icon: IconAuto,
    },
  ]
})

function renderLabel(option: any) {
  return h(NFlex, { align: 'center' }, {
    default: () => [
      h(option.icon),
      option.label,
    ],
  })
}
</script>

<template>
  <NPopselect :value="appStore.storeColorMode" :render-label="renderLabel" :options="options" trigger="click" @update:value="appStore.setColorMode">
    <CommonWrapper>
      <IconParkOutlineMoon v-if="appStore.storeColorMode === 'dark'" />
      <IconParkOutlineSunOne v-if="appStore.storeColorMode === 'light'" />
      <IconParkOutlineLaptopComputer v-if="appStore.storeColorMode === 'auto'" />
    </CommonWrapper>
  </NPopselect>
</template>

<style scoped></style>
