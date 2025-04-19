<script setup lang="ts">
defineOptions({
  name: 'LookForward',
})
const { t } = useI18n()
</script>

<template>
  <div class="size-full h-full my-auto flex-col-center gap-24px overflow-hidden">
    <div class="flex text-400px text-primary">
      <SvgIconsExpectation />
    </div>
    <slot>
      <h3 class="text-28px text-primary font-500">
        {{ t('common.lookForward') }}
      </h3>
    </slot>
  </div>
</template>

<style scoped></style>
