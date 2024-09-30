<script setup lang="ts">
import { useCoreStates } from '~/composables'

const { isBrowserProjectModalOpened } = useCoreStates()
</script>

<template>
  <app-modal v-model="isBrowserProjectModalOpened">
    bf
  </app-modal>
</template>

<script lang="ts">

</script>
