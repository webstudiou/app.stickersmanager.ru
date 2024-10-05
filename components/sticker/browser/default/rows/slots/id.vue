<script setup lang="ts">
withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div :style="style">
    <div class="flex items-center">
      {{ entry.data.attributes.id }}
    </div>
  </div>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'

type Props = {
  entry: Stickers.Sticker
  style: HTMLAttributes['style']
}
</script>
