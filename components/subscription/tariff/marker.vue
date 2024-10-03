<script setup lang="ts">
withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="inline-flex flex-center text-white rounded-xs align-top w-max px-1 py-0.5 text-xs uppercase" :class="title">
    {{ useLangs(`pages.settings.subscription.plans.${title}.title`) }}
  </div>
</template>

<script lang="ts">
type Props = {
  title: Subscriptions.TariffKey
}
</script>

<style lang="postcss" scoped>
.free {
  background: linear-gradient(180deg, theme('colors.primary.500'), theme('colors.primary.DEFAULT')), linear-gradient(180deg, theme('colors.primary.200'), theme('colors.primary.50'));
}
.team {
  background: linear-gradient(180deg, theme('colors.mint.500'), theme('colors.mint.DEFAULT')), linear-gradient(180deg, theme('colors.mint.200'), theme('colors.mint.50'));
}
.pro {
  background: linear-gradient(180deg, theme('colors.orange.500'), theme('colors.orange.DEFAULT')), linear-gradient(180deg, theme('colors.orange.200'), theme('colors.orange.50'));
}
.biz {
  background: linear-gradient(180deg, theme('colors.purple.500'), theme('colors.purple.DEFAULT')), linear-gradient(180deg, theme('colors.purple.200'), theme('colors.purple.50'));
}
</style>
