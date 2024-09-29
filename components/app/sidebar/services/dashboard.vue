<script setup lang="ts">
import { useStoreProjects } from '~/stores'

const router = useRouter()
const location = computed(() => String(router.currentRoute.value.path.replaceAll('/', '-').replace('-', '')))
const query = computed(() => {
  const _query = router.currentRoute.value.query
  return location.value + Object.keys(_query).map(k => `?${k}=${_query[k]}`).join('&').replace('next=', '')
})

const datasets = reactive({
  search: '',
})

const storeProjects = useStoreProjects()
</script>

<template>
  <div class="flex flex-col justify-between h-full mb-1.5 overflow-hidden">
    <div class="mx-2.5">
      <els-menu :default-id="query" router>
        <els-menu-section class="my-2.5">
          <els-input-search
            v-model="datasets.search"
            title="models.search.title"
            :title-fixed="false"
            size="sm"
            fluid
            disabled
          />
        </els-menu-section>
        <els-menu-item
          id="dashboard-stickers"
          title="pages.dashboard.stickers.index.headings.my"
          icon="stickers"
          :route="{ name: 'dashboard-stickers' }"
        />
        <els-menu-item
          id="dashboard"
          title="pages.dashboard.stickers.index.headings.all"
          icon="stickers"
          :route="{ name: 'dashboard' }"
        />
        <els-menu-item
          id="dashboard-projects"
          title="pages.dashboard.projects.index.headings.all"
          icon="projects"
          :route="{ name: 'dashboard-projects' }"
          @click="storeProjects.filters['archive'] = false"
        />
      </els-menu>
    </div>

    <portfolio-navigator />

    <div class="mx-2.5">
      <div class="rounded bg-gray-6 px-2.5 py-1.5 my-2.5">
        xdvcb
      </div>

      <els-menu :default-id="query" router>
        <els-menu-item
          id="dashboard-projects?archive=true"
          title="pages.dashboard.projects.index.headings.archive"
          icon="archive"
          :route="{ name: 'dashboard-projects', query: { archive: 'true' } }"
          @click="storeProjects.filters['archive'] = true"
        />
      </els-menu>
    </div>
  </div>
</template>
