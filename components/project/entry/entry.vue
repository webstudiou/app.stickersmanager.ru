<script lang="ts" setup>
import { useCrumbs, useErrorHandler } from '~/composables'
import { useRoute, useLazyFetch, useStoreProjects, useLangs } from '#imports'

const { setTitle, addCrumbs } = useCrumbs()
const storeProjects = useStoreProjects()

const route = useRoute()
const id = computed(() => String(route.params?.project_id))
const project = ref<Projects.Project>()

const { data, error } = await useLazyFetch<Projects.D_Project>(`/api/dashboard/projects/${id.value}`)

watch(data, (newData) => {
  project.value = newData.data
  storeProjects.entry = newData.data

  addCrumbs({ name: project.value.data.attributes.title })
  setTitle(project.value.data.attributes.title)
})

watch(error, (newError) => {
  useErrorHandler(newError)
})

useHead({
  title: useLangs('pages.dashboard.projects.index.headings.title'),
})
</script>

<template>
  <app-page class="bg-gray-6">
    <project-entry-header />
    <slot />
  </app-page>
</template>
