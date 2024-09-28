<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([])

setTitle('pages.dashboard.index.headings.title')

useHead({
  title: useLangs('pages.dashboard.index.headings.title'),
})
</script>

<template>
  <sticker-browser />
</template>
