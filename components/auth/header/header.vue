<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  to: undefined,
  src: undefined,
})
</script>

<template>
  <div class="mb-2.5 tablet:mb-5">
    <nuxt-link
      v-if="to && !$slots.default"
      :to="to"
    >
      <div :class="['flex', 'justify-center', 'flex-auto']">
        <nuxt-img
          alt="Logo"
          :src="src || '/images/logos/logo-light.svg'"
          class="h-[60px] hidden dark:block"
          fit="cover"
          loading="lazy"
        />
        <nuxt-img
          alt="Logo"
          :src="src || '/images/logos/logo-dark.svg'"
          class="h-[60px] dark:hidden"
          fit="cover"
          loading="lazy"
        />
      </div>
    </nuxt-link>
    <div v-else>
      <div :class="['flex', 'justify-center', 'flex-auto']">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'

type Props = {
  to?: RouteLocationRaw
  src?: string
}
</script>
