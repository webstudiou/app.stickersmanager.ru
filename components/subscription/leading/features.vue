<script setup lang="ts">
withDefaults(defineProps<Props>(), {})
</script>

<template>
  <ul class="w-full space-y-1.5">
    <slot />
    <subscription-leading-feature v-for="feature in features" :key="feature.title" :feature="feature" />
  </ul>
</template>

<script lang="ts">
type Props = {
  features: Subscriptions.Feature[]
}
</script>
