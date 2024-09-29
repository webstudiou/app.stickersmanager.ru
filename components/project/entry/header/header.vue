<script setup lang="ts">
import { useRoute, useRouter } from '#imports'

const router = useRouter()
const location = computed(() => String(router.currentRoute.value.path.replaceAll('/', '-').replace('-', '')))

const route = useRoute()
const id = computed(() => String(route.params?.project_id))

const links = computed(() => [
  {
    key: `default`,
    location: `dashboard-projects-${id.value}`,
    route: 'dashboard-projects-project_id',
    disabled: false,
  },
  {
    key: `stickers`,
    location: `dashboard-projects-${id.value}-stickers`,
    route: 'dashboard-projects-project_id-stickers',
    disabled: true,
  },
  {
    key: `documents`,
    location: `dashboard-projects-${id.value}-documents`,
    route: 'dashboard-projects-project_id-documents',
    disabled: true,
  },
  {
    key: `apps`,
    location: `dashboard-projects-${id.value}-apps`,
    route: 'dashboard-projects-project_id-apps',
    disabled: false,
  },
  {
    key: `settings`,
    location: `dashboard-projects-${id.value}-settings`,
    route: 'dashboard-projects-project_id-settings',
    disabled: true,
  },
])
</script>

<template>
  <div class="relative flex items-center gap-1.5 w-full p-2.5 border-b border-b-backgrounds-secondary bg-backgrounds-primary">
    <!--    z-index: 10; -->
    <els-link
      v-for="link in links"
      :key="link.key"
      :to="{ name: link.route, params: { project_id: id } }"
      :active="link.location === location"
      active-class="text-primary"
      :disabled="link.disabled"
    >
      {{ useLangs(`pages.dashboard.projects.id${link.key === 'default' ? '' : `.${link.key}`}.index.headings.title`) }}
    </els-link>
  </div>
</template>

<style scoped>

</style>
