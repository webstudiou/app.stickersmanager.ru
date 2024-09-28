<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.dashboard.projects.index.headings.all' },
])

setTitle('pages.dashboard.projects.index.headings.all')

useHead({
  title: useLangs('pages.dashboard.projects.index.headings.all'),
})
</script>

<template>
  <project-browser>
    <project-browser-default />
  </project-browser>
</template>
