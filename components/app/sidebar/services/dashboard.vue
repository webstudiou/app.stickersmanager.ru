<script setup lang="ts">
import { useLangs, useStoreAuth, useStoreProjects } from '#imports'

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

const storeAuth = useStoreAuth()
const limits = computed(() => storeAuth.limits)
const next_tariff = computed(() => {
  switch (storeAuth.dashboard.data.relationships.subscription.data.attributes.tariff) {
    case 'free': return 'team'
    case 'team': return 'pro'
    case 'pro': return 'biz'
    case 'biz': return ''
  }
})
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
      <div v-if="next_tariff" class="rounded bg-gray-6 px-2.5 py-1.5 my-2.5 text-sm text-muted grid grid-rows-3 items-center">
        <div>
          {{ useLangs('pages.dashboard.limits.projects.used', { val: limits.max_projects.use, max: limits.max_projects.total }) }}
        </div>
        <els-progress-bar :value="limits.max_projects.use" :max="limits.max_projects.total" />
        <div class="flex justify-end text-primary">
          <els-link :to="{ name: 'settings-subscription' }">
            {{ useLangs('buttons.update.tariff.to.title') }}
            <app-tariff :limit-key="next_tariff" />
          </els-link>
        </div>
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
