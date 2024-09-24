<script setup lang="ts">
import { useStoreConfigs } from '~/stores'

const storeConfigs = useStoreConfigs()
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <app-sidebar-services-dashboard v-if="storeConfigs.service === 'dashboard'" />
    <app-sidebar-services-knowledge v-if="storeConfigs.service === 'knowledge'" />
    <app-sidebar-services-storage v-if="storeConfigs.service === 'storage'" />
    <app-sidebar-services-staff v-if="storeConfigs.service === 'staff'" />
    <app-sidebar-services-settings v-if="storeConfigs.service === 'settings'" />
    <app-sidebar-services-me v-if="storeConfigs.service === 'me'" />
  </div>
</template>
