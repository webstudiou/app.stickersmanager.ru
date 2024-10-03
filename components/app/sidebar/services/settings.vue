<script setup lang="ts">
const router = useRouter()
const location = computed(() => String(router.currentRoute.value.path.replaceAll('/', '-').replace('-', '')))

const links = [
  {
    key: 'settings',
    title: 'pages.settings.index.headings.root',
    icon: 'settings',
    route: { name: 'settings' },
    disabled: false,
  },
  {
    key: 'settings-subscription',
    title: 'pages.settings.subscription.index.headings.title',
    icon: 'subscription',
    route: { name: 'settings-subscription' },
    disabled: false,
  },
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
  {
    key: 'settings-roles',
    title: 'pages.settings.roles.index.headings.title',
    icon: 'security',
    route: { name: 'settings-roles' },
    disabled: false,
  },
  {
    key: 'settings-integrations',
    title: 'pages.settings.integrations.index.headings.title',
    icon: 'integrations',
    route: { name: 'settings-integrations' },
    disabled: false,
  },
  {
    key: 'settings-domains',
    title: 'pages.settings.domains.index.headings.title',
    icon: 'domains',
    route: { name: 'settings-domains' },
    disabled: false,
  },
  {
    key: 'settings-tags',
    title: 'pages.settings.tags.index.headings.title',
    icon: 'tags',
    route: { name: 'settings-tags' },
    disabled: false,
  },
  {
    key: 'settings-logs',
    title: 'pages.settings.logs.index.headings.title',
    icon: 'logs',
    route: { name: 'settings-logs' },
    disabled: false,
  },
  {
    key: 'settings-api',
    title: 'pages.settings.api.index.headings.title',
    icon: 'api',
    route: { name: 'settings-api' },
    disabled: false,
  },
  {
    key: 'settings-imports',
    title: 'pages.settings.imports.index.headings.title',
    icon: 'imports',
    route: { name: 'settings-imports' },
    disabled: false,
  },
  {
    key: 'settings-trash',
    title: 'pages.settings.trash.index.headings.title',
    icon: 'delete',
    route: { name: 'settings-trash' },
    disabled: false,
  },
]
</script>

<template>
  <div class="tablet:m-2.5 mt-0">
    <els-menu :default-id="location" router>
      <els-menu-header title="pages.settings.index.headings.title" />
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
