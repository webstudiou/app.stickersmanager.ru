<script setup lang="ts">
import { useCrumbs } from '~/composables'
import { useLangs } from '#app-ui/composables'

const { setCrumbs, setTitle } = useCrumbs()

setCrumbs([
  { name: 'pages.settings.index.headings.title', to: 'settings' },
  { name: 'pages.settings.tags.index.headings.title' },
])

setTitle('pages.settings.tags.index.headings.title')

useHead({
  title: useLangs('pages.settings.tags.index.headings.title'),
})

const datasets = reactive({
  search: '',
})
</script>

<template>
  <app-page class="bg-gray-6">
    <div class="relative flex flex-col flex-auto overflow-hidden">
      <app-page-info title="pages.settings.tags.index.pre-headers.title" description="pages.settings.tags.index.pre-headers.description" class="mx-2.5" />
      <div class="relative flex justify-between flex-none p-2.5 gap-2.5">
        <div class="flex items-center flex-auto h-full">
          <els-input-search
            v-model="datasets.search"
            title="models.search.title"
            :title-fixed="false"
            fluid
            :ui="{ bg: 'bg-backgrounds-primary' }"
          />
        </div>
        <div class="flex items-center flex-none h-full justify-end gap-2.5">
          <els-button title="buttons.add.tag.title" />
        </div>
      </div>
      <div class="relative grid grid-rows-[max-content_1fr] h-full overflow-auto bg-backgrounds-primary">
        <div class="">
          <div class="px-2.5">
            <div
              v-for="i in 100"
              :key="i"
              class="relative flex items-center justify-between h-[--row-min-height] gap-1.5 cursor-pointer"
            >
              <!--              padding: 8px;
              transition: background .2s ease-in-out;
              border-radius: 8px; -->
              <div class="flex items-center flex-auto">
                gap: 8px;
              </div>
              <div class="flex items-center">
                gap: 8px;
                width: 300px;
              </div>
              <div class="flex items-center">
                gap: 8px;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-page>
</template>
