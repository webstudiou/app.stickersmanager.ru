<script setup lang="ts">

</script>

<template>
  <app-page class="bg-gray-6">
    <div class="relative flex flex-col flex-auto overflow-hidden">
      <project-browser-header />

      <slot />

      <project-modals-folder />
      <project-modals-project />
    </div>
  </app-page>
</template>
