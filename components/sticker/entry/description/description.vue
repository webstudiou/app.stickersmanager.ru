<script setup lang="ts">
import debounce from 'lodash/debounce'
import { useStoreStickers } from '~/stores'

const storeStickers = useStoreStickers()
const entry = computed(() => storeStickers.entry)

const changes = debounce(async () => {
  await storeStickers.change('description', entry.value.data.attributes.description)
}, 1000)
</script>

<template>
  <div class="overflow-hidden cursor-text mx-1 my-2.5 bg-backgrounds-primary min-h-[100px]">
    <tiptap-editor v-model="entry.data.attributes.description" @change="changes" />
  </div>
</template>
