<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.knowledge.index.headings.title' },
])

setTitle('pages.knowledge.index.headings.title')

useHead({
  title: useLangs('pages.knowledge.index.headings.title'),
})
</script>

<template>
  <app-page
    scrollable
    class="bg-backgrounds-primary"
  >
    <app-container />
  </app-page>
</template>
