<script setup lang="ts">
import { useStoreConfigs } from '~/stores/StoreConfigs'

const storeConfigs = useStoreConfigs()

const loading = computed(() => storeConfigs.loading)
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden bg-backgrounds-secondary/50">
    <client-only fallback-tag="div">
      <template v-if="loading">
        <!-- Loader -->
        <div class="flex flex-center w-full h-full">
          <els-spinner />
        </div>
      </template>

      <template v-else>
        <!-- Layout -->
        <app-sidebar />
        <div class="flex flex-1 w-full min-w-0 border-l border-backgrounds-secondary">
          <div class="flex-col items-stretch relative w-full flex-1 flex">
            <app-header />
            <slot />
            <els-notifications />
          </div>
        </div>
      </template>

      <template #fallback>
        <!-- Fallback -->
        <div class="flex flex-center w-full h-full">
          <els-spinner />
        </div>
      </template>
    </client-only>
  </div>
</template>
