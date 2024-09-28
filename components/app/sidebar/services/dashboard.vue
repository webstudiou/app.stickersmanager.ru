<script setup lang="ts">
const router = useRouter()
const location = computed(() => String(router.currentRoute.value.path.replaceAll('/', '-').replace('-', '')))

const datasets = reactive({
  search: '',
})
</script>

<template>
  <div class="flex flex-col justify-between h-full mb-1.5 overflow-hidden">
    <div class="mx-2.5">
      <els-menu :active-id="location" router>
        <els-menu-section class="my-2.5">
          <els-input-search
            v-model="datasets.search"
            title="models.search.title"
            :title-fixed="false"
            fluid
          />
        </els-menu-section>
        <els-menu-section>
          <els-menu-item
            id="dashboard-stickers"
            title="pages.dashboard.stickers.index.headings.my"
            icon="stickers"
            :route="{ name: 'dashboard' }"
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
          />
        </els-menu-section>
      </els-menu>
    </div>
    <portfolio-navigator />
    <div class="rounded bg-gray-6 px-2.5 py-1.5 mx-2.5">
      xdvcb
    </div>
  </div>
</template>
