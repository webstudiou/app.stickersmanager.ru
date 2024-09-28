<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.dashboard.stickers.index.headings.my' },
])

setTitle('pages.dashboard.stickers.index.headings.my')

useHead({
  title: useLangs('pages.dashboard.stickers.index.headings.my'),
})
</script>

<template>
  <sticker-browser />
</template>
