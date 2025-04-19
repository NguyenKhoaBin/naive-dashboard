<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <NTooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="appStore.contentFullScreen = !appStore.contentFullScreen">
        <IconParkOutlineOffScreenOne v-if="appStore.contentFullScreen" />
        <IconParkOutlineFullScreenOne v-else />
      </CommonWrapper>
    </template>
    <span>{{ $t('app.togglContentFullScreen') }}</span>
  </NTooltip>
</template>
