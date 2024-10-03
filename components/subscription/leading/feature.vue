<script setup lang="ts">
import { useLangs } from '#imports'

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <li class="flex items-center justify-start gap-0.5 text-fonts-primary">
    <els-icon name="solar:check-read-linear" size="14" class="text-primary" />
    <span class="truncate text-sm font-light">
      <template v-if="feature.strategy === 'can'">
        {{ useLangs(feature.title) }}
      </template>
      <template v-if="feature.strategy === 'max'">
        {{ useLangs(feature.title, { val: feature.max !== -1 ? feature.max : '∞' }) }}
      </template>
      <template v-if="feature.strategy === 'sum'">
        {{ useLangs(feature.title, { val: (parseFloat(feature.price)) || feature.max }) }}
      </template>
    </span>
  </li>
</template>

<script lang="ts">
type Props = {
  feature: Subscriptions.Feature
}
</script>
