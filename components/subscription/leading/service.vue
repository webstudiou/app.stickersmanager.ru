<script setup lang="ts">
import { useLangs } from '#imports'

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="space-y-2.5 mb-5 last-of-type:mb-0">
    <div class="flex items-center gap-1.5">
      <div class="bg-backgrounds-secondary h-md w-md flex flex-center shrink-0 rounded-md leading-none">
        <els-icon :name="service[0]" class="text-primary" />
      </div>
      <div class="flex flex-col items-start justify-center text-md gap-1">
        <div>
          {{ useLangs(`pages.settings.subscription.services.${service[0]}.title`) }}
        </div>
        <div class="text-sm text-muted">
          {{ useLangs(`pages.settings.subscription.services.${service[0]}.description`) }}
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 laptop:grid-cols-4 gap-2.5">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
type Props = {
  service: Subscriptions.MapPlan
}
</script>
