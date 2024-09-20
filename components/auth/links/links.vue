<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  to: undefined,
  href: undefined,
  disabled: false,
})
</script>

<template>
  <div
    class="text-center text-subheadline mt-2.5 tablet:mt-5"
    :class="{
      'pointer-events-none': disabled,
    }"
  >
    {{ useLangs(question) }}
    <nuxt-link
      v-if="to"
      :to="to"
      class="ml-1.5 text-primary font-medium"
    >
      {{ useLangs(answer) }}
    </nuxt-link>
    <a
      v-if="href"
      :href="href"
      class="ml-1.5 text-primary font-medium"
    >
      {{ useLangs(answer) }}
    </a>
    <slot />
  </div>
</template>

<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { useLangs } from '#app-ui/composables'

type Props = {
  to?: RouteLocationRaw
  question: string
  answer: string
  href?: string
  disabled?: boolean
}
</script>
