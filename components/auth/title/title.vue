<script setup lang="ts">
withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="text-center mb-2.5 tablet:mb-5">
    <h1
      v-if="title"
      class="text-title3 truncate font-semibold"
    >
      {{ useLangs(title) }}
    </h1>
    <div
      v-if="description"
      class="text-muted truncate"
    >
      {{ useLangs(description) }}
    </div>
  </div>
</template>

<script lang="ts">
import { useLangs } from '#app-ui/composables'

type Props = {
  title: string
  description: string
}
</script>
