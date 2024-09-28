<script setup lang="ts">
import { useStoreStickers } from '~/stores'

const storeStickers = useStoreStickers()
</script>

<template>
  <div>
    <button @click="storeStickers.browser = 'default'">
      default
    </button>
    <button @click="storeStickers.browser = 'month'">
      month
    </button>
    <button @click="storeStickers.browser = 'week'">
      week
    </button>
  </div>
</template>

<style scoped>

</style>
