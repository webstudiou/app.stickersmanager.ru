<script setup lang="ts">
const router = useRouter()
const location = computed(() => String(router.currentRoute.value.path.replaceAll('/', '-').replace('-', '')))

const links = [
  {
    key: 'staff',
    title: 'pages.staff.index.headings.title',
    icon: 'staff',
    route: { name: 'staff' },
    disabled: false,
  },
  {
    key: 'staff-teams',
    title: 'pages.staff.teams.index.headings.title',
    icon: 'teams',
    route: { name: 'staff-teams' },
    disabled: false,
  },
]
</script>

<template>
  <div class="tablet:m-2.5 mt-0">
    <els-menu :default-id="location" router>
      <els-menu-header title="pages.staff.index.headings.root" />
      <els-menu-item
        v-for="link in links"
        :id="link.key"
        :key="link.key"
        :title="link.title"
        :icon="link.icon"
        :route="link.route"
        :disabled="link.disabled"
      />
    </els-menu>
  </div>
</template>
