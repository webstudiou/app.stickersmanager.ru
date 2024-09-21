<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.me.index.headings.title', to: 'me' },
  { name: 'pages.me.notifications.index.headings.title' },
])

setTitle('pages.me.notifications.index.headings.title')

useHead({
  title: useLangs('pages.me.notifications.index.headings.title'),
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
