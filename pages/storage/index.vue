<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.storage.index.headings.title' },
])

setTitle('pages.storage.index.headings.title')

useHead({
  title: useLangs('pages.storage.index.headings.title'),
})

const t = ref('')
</script>

<template>
  <app-page
    scrollable
    class="bg-backgrounds-primary"
  >
    <app-container>
      <tiptap-editor v-model="t" />
    </app-container>
    {{ t }}
  </app-page>
</template>
