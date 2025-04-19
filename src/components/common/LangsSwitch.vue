<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
const options = [
  { label: 'English', value: 'enUS' },
  { label: 'Tiếng Việt', value: 'viVN' },
]
</script>

<template>
  <NPopselect :value="appStore.lang" :options="options" trigger="click" @update:value="appStore.setAppLang">
    <CommonWrapper>
      <IconParkOutlineTranslate />
    </CommonWrapper>
  </NPopselect>
</template>

<style scoped></style>
