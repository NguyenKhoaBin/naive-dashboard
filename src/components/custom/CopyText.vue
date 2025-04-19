<script setup lang="ts">
interface Props {
  maxLength?: string
}
const { maxLength } = defineProps<Props>()
const modelValue = defineModel<string>('value')
</script>

<template>
  <div v-if="modelValue" class="inline-flex items-center gap-0.5em">
    <NEllipsis :style="{ 'max-width': maxLength || '12em' }">
      {{ modelValue }}
    </NEllipsis>
    <NTooltip trigger="hover">
      <template #trigger>
        <span v-copy="modelValue" class="cursor-pointer">
          <IconParkOutlineCopy />
        </span>
      </template>
      {{ $t('components.copyText.tooltip') }}
    </NTooltip>
  </div>
</template>
