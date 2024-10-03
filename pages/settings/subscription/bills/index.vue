<script setup lang="ts">
import { useLangs, useHead, useCrumbs } from '#imports'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.settings.index.headings.title', to: 'settings' },
  { name: 'pages.settings.subscription.index.headings.title', to: 'settings-subscription' },
  { name: 'pages.settings.subscription.bills.index.headings.title' },
])

setTitle('pages.settings.subscription.bills.index.headings.title')

useHead({
  title: useLangs('pages.settings.subscription.bills.index.headings.title'),
})
</script>

<template>
  <app-page scrollable class="bg-backgrounds-primary select-none">
    <subscription-header />
  </app-page>
</template>
