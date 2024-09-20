<script setup lang="ts">
import { useStoreConfigs } from '~/stores'

const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? '#007aff' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'ru',
  },
})

const title = useState('appTitle', () => 'Stickers Manager')
const description = useState('appDescription', () => '')

useHead({
  titleTemplate: (titleChunk) => {
    if (titleChunk) {
      const postTitle = description.value
        ? ` | ${title.value} - ${description.value}`
        : `${title.value ? ` | ${title.value}` : ''}`
      return `${titleChunk} ${postTitle}`
    }

    return description.value
      ? `${title.value} | ${description.value}`
      : `${title.value}`
  },
})

useSeoMeta({
  title: title.value,
  description: description.value,
  ogTitle: title.value,
  ogDescription: description.value,
  // @TODO: Задать изображения для поисковиков
  // ogImage: 'https://dashboard-template.nuxt.dev/social-card.png',
  // twitterImage: 'https://dashboard-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image',
})

onBeforeMount(async () => {
  const storeConfigs = useStoreConfigs()
  await storeConfigs.init().then(() => {
    title.value = storeConfigs.app?.title || 'Stickers Manager'
    description.value = storeConfigs.app?.description || ''
  })
})
</script>

<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>
