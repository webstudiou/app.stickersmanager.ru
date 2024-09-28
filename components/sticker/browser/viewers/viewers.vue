<script setup lang="ts">
import { useStoreConfigs } from '~/stores'

const storeConfigs = useStoreConfigs()
</script>

<template>
  <div>
    <button @click="storeConfigs.browser = 'default'">
      default
    </button>
    <button @click="storeConfigs.browser = 'month'">
      month
    </button>
    <button @click="storeConfigs.browser = 'week'">
      week
    </button>
  </div>
</template>

<style scoped>

</style>
