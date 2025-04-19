<script setup lang="ts"></script>

<template>
  <NEl
    tag="div"
    class="el p-3 cursor-pointer rounded"
  >
    <NFlex
      align="center"
      :wrap="false"
      class="h-full"
    >
      <slot />
    </NFlex>
  </NEl>
</template>

<style scoped>
  .el {
    color: var(--n-text-color);
    transition: 0.3s var(--cubic-bezier-ease-in-out);
  }
  .el:hover {
    background-color: var(--button-color-2-hover);
    color: var(--n-text-color-hover);
  }
</style>
