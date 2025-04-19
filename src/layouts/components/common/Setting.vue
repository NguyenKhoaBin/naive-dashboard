<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <NTooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="appStore.showSetting = !appStore.showSetting">
        <div>
          <IconParkOutlineSettingTwo />
        </div>
      </CommonWrapper>
    </template>
    <span>{{ $t('app.setting') }}</span>
  </NTooltip>
</template>
