<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.staff.id.index.headings.title', to: 'staff' },
  { name: 'pages.staff.id.index.headings.title' },
])

setTitle('pages.staff.id.index.headings.title')

useHead({
  title: useLangs('pages.staff.id.index.headings.title'),
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
