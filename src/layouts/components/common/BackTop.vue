<script setup lang="ts"></script>

<template>
  <NBackTop :bottom="80" :visibility-height="300">
    <NTooltip placement="left" trigger="hover">
      <template #trigger>
        <div wh-full flex-center>
          <IconParkOutlineToTop />
        </div>
      </template>
      <span>{{ $t('app.backTop') }}</span>
    </NTooltip>
  </NBackTop>
</template>
