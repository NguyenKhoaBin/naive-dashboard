<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()

const loading = ref(false)

function handleReload() {
  loading.value = true
  appStore.reloadPage()
  setTimeout(() => {
    loading.value = false
  }, 800)
}
</script>

<template>
  <NTooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="handleReload">
        <IconParkOutlineRefresh :class="{ 'animate-spin': loading }" />
      </CommonWrapper>
    </template>
    <span>{{ $t('common.reload') }}</span>
  </NTooltip>
</template>

<style scoped></style>
