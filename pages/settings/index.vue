<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.settings.index.headings.title' },
])

setTitle('pages.settings.index.headings.title')

useHead({
  title: useLangs('pages.settings.index.headings.title'),
})
</script>

<template>
  <app-page scrollable class="bg-backgrounds-primary">
    <app-container />
  </app-page>
</template>
