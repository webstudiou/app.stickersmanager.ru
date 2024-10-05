<script setup lang="ts">
import { useStoreAuth } from '#imports'

const storeAuth = useStoreAuth()
const limits = computed(() => storeAuth.limits)
</script>

<template>
  <app-page class="bg-gray-6">
    <div v-if="limits.max_projects.use" class="relative flex flex-col flex-auto overflow-hidden">
      <project-browser-header />

      <slot />
    </div>
    <project-browser-empty v-else />
  </app-page>
</template>
