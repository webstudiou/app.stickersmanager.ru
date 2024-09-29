<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.dashboard.projects.index.headings.title', to: 'dashboard-projects' },
])

setTitle('pages.dashboard.projects.index.headings.title')

useHead({
  title: useLangs('pages.dashboard.projects.index.headings.title'),
})
</script>

<template>
  <project-entry>
    <project-entry-documents />
  </project-entry>
</template>
