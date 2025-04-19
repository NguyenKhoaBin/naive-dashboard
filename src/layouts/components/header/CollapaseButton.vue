<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <NTooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="appStore.toggleCollapse()">
        <IconParkOutlineMenuUnfold v-if="appStore.collapsed" />
        <IconParkOutlineMenuFold v-else />
      </CommonWrapper>
    </template>
    <span>{{ $t('app.toggleSider') }}</span>
  </NTooltip>
</template>

<style scoped></style>
