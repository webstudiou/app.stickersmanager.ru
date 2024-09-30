<script setup lang="ts">
import { useStoreAuth, useStoreDashboard } from '~/stores'

const storeAuth = useStoreAuth()
const storeDashboard = useStoreDashboard()

const dashboard = computed(() => storeAuth.dashboard)
const dashboards = computed(() => storeDashboard.entries)

const items = computed(() => {
  const _items = []

  _items.push([
    {
      title: 'pages.settings.index.headings.title',
      icon: 'settings',
      to: { name: 'settings' },
    },
    {
      title: 'pages.staff.index.headings.title',
      icon: 'staff',
      to: { name: 'staff' },
    },
    {
      title: 'pages.settings.subscription.index.headings.title',
      icon: 'subscription',
      to: { name: 'settings-subscription' },
    },
    {
      title: 'buttons.add.user.title',
      icon: 'add-user',
    },
  ])

  const _dashboards = []
  dashboards.value.forEach((_dashboard) => {
    if (_dashboard.data.id !== dashboard.value.data.id) _dashboards.push({
      title: _dashboard.data.attributes.title,
      icon: 'dashboard',
      click: () => handleChangeDashboard(_dashboard.data.id),
    } as DropdownItem)
  })
  if (_dashboards.length) _items.push(_dashboards)

  _items.push([
    {
      title: 'buttons.create.dashboard.title',
      class: 'bg-primary text-white hover:bg-primary hover:text-white justify-center',
      click: () => datasets.visible = true,
    },
  ])
  return _items
})

const datasets = reactive({
  visible: false,
})

async function handleChangeDashboard(id: string) {
  await storeDashboard.change(id)
}
</script>

<template>
  <div class="flex items-center flex-shrink-0 min-w-0 tablet:p-2.5 h-[--header-height] border-b border-backgrounds-secondary select-none">
    <els-dropdown
      :items
      class="w-full"
      :ui="{ width: 'w-full', divide: 'divide-dotted' }"
      :popper="{ strategy: 'absolute' }"
    >
      <div class="flex gap-1.5 overflow-hidden">
        <els-avatar size="lg" :src="dashboard.data.attributes.image?.xxxl || '/images/defaults/avatar.png'" />
        <div class="flex flex-col justify-center w-full overflow-hidden">
          <div class="font-medium truncate">
            {{ dashboard.data.attributes.title }}
          </div>
          <div class="text-muted text-sm truncate mb-1">
            {{ dashboard.data.attributes.title }}
          </div>
        </div>
      </div>
    </els-dropdown>

    <dashboard-modals-create v-model="datasets.visible" />
  </div>
</template>
