<script setup lang="ts">
interface Props {
  message: string
}

const { message } = defineProps<Props>()
</script>

<template>
  <NTooltip :show-arrow="false" trigger="hover">
    <template #trigger>
      <IconParkOutlineHelp class="op-50 cursor-help" />
    </template>
    {{ message }}
  </NTooltip>
</template>
