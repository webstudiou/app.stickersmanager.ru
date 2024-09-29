<script setup lang="ts">
withDefaults(defineProps<Props>(), {

})
</script>

<template>
  <div ref="SectionsRef" class="sticky top-0 grid grid-flow-col auto-cols-max items-center px-2.5 text-muted bg-backgrounds-primary border-b border-transparent transition-[border-bottom-color] mb-2.5 h-lg">
    <!--            z-index: 11; -->
    <a
      v-for="service in services"
      :key="service.key"
      :href="`#${service.key}`"
      :disabled="service.disabled"
      class="grid grid-flow-col auto-cols-max items-center gap-1.5 px-1.5 w-max rounded-xs hover:bg-gray-6 hover:text-labels-primary transition-colors"
    >
      <els-icon :name="service.icon" size=".875rem" />
      {{ useLangs(service.key) }}
      <!--              text-decoration: unset; -->
    </a>
  </div>
</template>

<script lang="ts">
import type { IService } from '../entry.vue'

type Props = {
  services: IService[]
}
</script>
