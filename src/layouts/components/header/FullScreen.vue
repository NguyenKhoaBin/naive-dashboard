<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()

useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'F11' && e.type === 'keydown') {
      e.preventDefault()
      appStore.toggleFullScreen()
    }
  },
})
</script>

<template>
  <NTooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="appStore.toggleFullScreen">
        <IconParkOutlineOffScreen v-if="appStore.fullScreen" />
        <IconParkOutlineFullScreen v-else />
      </CommonWrapper>
    </template>
    <span>{{ $t('app.toggleFullScreen') }}</span>
  </NTooltip>
</template>
