<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.dashboard.index.headings.title' },
])

setTitle('pages.dashboard.projects.index.headings.title')

useHead({
  title: useLangs('pages.dashboard.projects.index.headings.title'),
})
</script>

<template>
  <project-browser>
    <project-browser-default />
  </project-browser>
</template>
