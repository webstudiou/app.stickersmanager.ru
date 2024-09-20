<script setup lang="ts">
import { version } from '~/package.json'
import { useStoreConfigs } from '~/stores'

const storeConfigs = useStoreConfigs()
const server = computed(() => storeConfigs.app?.version || '1.0.0')
const title = computed(() => storeConfigs.app?.title || 'W Studio U')
const site = computed(() => storeConfigs.org?.url || 'https://wstudiou.ru')
</script>

<template>
  <div class="flex flex-col grow items-center justify-between overflow-hidden bg-backgrounds-secondary dark:bg-backgrounds-primary">
    <div class="flex flex-col w-full flex-auto justify-center overflow-hidden">
      <app-container class="flex flex-center overflow-hidden">
        <slot />
      </app-container>
    </div>

    <app-container class="text-center uppercase text-caption1 py-2.5">
      <div>
        &copy;
        2023 - {{ (new Date()).getFullYear() }}
        <els-link
          target="_blank"
          :href="site"
        >
          {{ title }}
        </els-link>
      </div>
      <div class="text-muted">
        Client: {{ version }}&nbsp;/&nbsp;Server: {{ server }}
      </div>
    </app-container>
  </div>
</template>
