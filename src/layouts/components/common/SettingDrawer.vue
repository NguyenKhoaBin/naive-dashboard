<script setup lang="ts">
import { useAppStore } from '@/store'
import LayoutSelector from './LayoutSelector.vue'

const appStore = useAppStore()

const { t } = useI18n()

const transitionSelectorOptions = computed(() => {
  return [
    {
      label: t('app.transitionNull'),
      value: '',
    },
    {
      label: t('app.transitionFadeSlide'),
      value: 'fade-slide',
    },
    {
      label: t('app.transitionFadeBottom'),
      value: 'fade-bottom',
    },
    {
      label: t('app.transitionFadeScale'),
      value: 'fade-scale',
    },
    {
      label: t('app.transitionZoomFade'),
      value: 'zoom-fade',
    },
    {
      label: t('app.transitionZoomOut'),
      value: 'zoom-out',
    },
    {
      label: t('app.transitionSoft'),
      value: 'fade',
    },
  ]
})

const palette = [
  '#ffb8b8',
  '#d03050',
  '#F0A020',
  '#fff200',
  '#ffda79',
  '#18A058',
  '#006266',
  '#22a6b3',
  '#18dcff',
  '#2080F0',
  '#c56cf0',
  '#be2edd',
  '#706fd3',
  '#4834d4',
  '#130f40',
  '#4b4b4b',
]

function resetSetting() {
  window.$dialog.warning({
    title: t('app.resetSettingTitle'),
    content: t('app.resetSettingContent'),
    positiveText: t('common.confirm'),
    negativeText: t('common.cancel'),
    onPositiveClick: () => {
      appStore.resetAlltheme()
      window.$message.success(t('app.resetSettingMeaasge'))
    },
  })
}
</script>

<template>
  <NDrawer v-model:show="appStore.showSetting" :width="360">
    <NDrawerContent :title="t('app.systemSetting')" closable>
      <NSpace vertical>
        <NDivider>{{ $t('app.layoutSetting') }}</NDivider>
        <LayoutSelector v-model:value="appStore.layoutMode" />
        <NDivider>{{ $t('app.themeSetting') }}</NDivider>
        <NSpace justify="space-between">
          {{ $t('app.colorWeak') }}
          <NSwitch :value="appStore.colorWeak" @update:value="appStore.toggleColorWeak" />
        </NSpace>
        <NSpace justify="space-between">
          {{ $t('app.blackAndWhite') }}
          <NSwitch :value="appStore.grayMode" @update:value="appStore.toggleGrayMode" />
        </NSpace>
        <NSpace align="center" justify="space-between">
          {{ $t('app.themeColor') }}
          <NColorPicker
            v-model:value="appStore.primaryColor" class="w-10em" :swatches="palette"
            @update:value="appStore.setPrimaryColor"
          />
        </NSpace>
        <NSpace align="center" justify="space-between">
          {{ $t('app.pageTransition') }}
          <NSelect
            v-model:value="appStore.transitionAnimation" class="w-10em"
            :options="transitionSelectorOptions" @update:value="appStore.reloadPage"
          />
        </NSpace>

        <NDivider>{{ $t('app.interfaceDisplay') }}</NDivider>
        <NSpace justify="space-between">
          {{ $t('app.logoDisplay') }}
          <NSwitch v-model:value="appStore.showLogo" />
        </NSpace>
        <NSpace justify="space-between">
          {{ $t('app.topProgress') }}
          <NSwitch v-model:value="appStore.showProgress" />
        </NSpace>
        <NSpace justify="space-between">
          {{ $t('app.multitab') }}
          <NSwitch v-model:value="appStore.showTabs" />
        </NSpace>
        <NSpace justify="space-between">
          {{ $t('app.bottomCopyright') }}
          <NSwitch v-model:value="appStore.showFooter" />
        </NSpace>
        <NSpace justify="space-between">
          {{ $t('app.breadcrumb') }}
          <NSwitch v-model:value="appStore.showBreadcrumb" />
        </NSpace>
        <NSpace justify="space-between">
          {{ $t('app.BreadcrumbIcon') }}
          <NSwitch v-model:value="appStore.showBreadcrumbIcon" />
        </NSpace>
        <NSpace justify="space-between">
          {{ $t('app.watermake') }}
          <NSwitch v-model:value="appStore.showWatermark" />
        </NSpace>
      </NSpace>

      <template #footer>
        <NButton type="error" @click="resetSetting">
          {{ $t('app.reset') }}
        </NButton>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
