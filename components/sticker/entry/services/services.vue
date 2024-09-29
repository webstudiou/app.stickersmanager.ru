<script setup lang="ts">
withDefaults(defineProps<Props>(), {

})
</script>

<template>
  <div
    v-for="service in services"
    :id="`#${service.key}`"
    :key="service.key"
    class="m-2.5 text-muted"
  >
    <div class="grid grid-cols-[max-content_1fr] gap-1.5 items-center">
      <div class="grid grid-cols-[repeat(2,_max-content)] gap-1.5 items-center cursor-pointer rounded-xs w-max px-1.5 hover:bg-gray-6 hover:text-labels-primary transition-colors">
        <els-icon :name="service.icon" size=".875rem" />
        <div class="mr-1.5">
          <div class="flex items-center">
            <a />
            {{ useLangs(service.key) }}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-[repeat(2,_max-content)] gap-1.5 items-center">
        0/0
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { IService } from '../entry.vue'

type Props = {
  services: IService[]
}
</script>
