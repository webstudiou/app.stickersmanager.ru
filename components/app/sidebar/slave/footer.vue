<script setup lang="ts">
import { useStoreAuth } from '~/stores'
import { useCoreStates } from '~/composables'

const storeAuth = useStoreAuth()
const user = computed(() => storeAuth.user)
const settings = computed(() => storeAuth.settings)

const { isNotificationsOpened } = useCoreStates()

const items = computed(() => {
  const _items: DropdownItem[][] = []

  _items.push([
    {
      title: 'pages.dashboard.index.headings.root',
      icon: 'dashboard',
      to: { name: 'dashboard' },
    },
    {
      title: 'pages.knowledge.index.headings.title',
      icon: 'knowledge',
      to: { name: 'knowledge' },
    },
    {
      title: 'pages.storage.index.headings.title',
      icon: 'storage',
      to: { name: 'storage' },
    },
    {
      title: 'pages.staff.index.headings.title',
      icon: 'staff',
      to: { name: 'staff' },
    },
    {
      title: 'pages.notifications.index.headings.title',
      icon: 'notifications',
      click: () => isNotificationsOpened.value = !isNotificationsOpened.value,
    },
    {
      title: 'pages.settings.index.headings.title',
      icon: 'settings',
      to: { name: 'settings' },
    },
  ])

  _items.push([
    {
      title: 'pages.me.index.headings.title',
      icon: 'me',
      to: { name: 'me' },
    },
    {
      title: 'pages.sign-out.index.headings.title',
      icon: 'signout',
      click: () => handleSignOut(),
    },
  ])

  return _items
})

async function handleSignOut() {
  await storeAuth.signout()
}
</script>

<template>
  <div class="flex items-center justify-between flex-shrink-0 min-h-[--header-height] tablet:px-2.5 tablet:pb-2.5">
    <div class="flex flex-col grow gap-2.5">
      <els-divider />
      <els-dropdown
        :items
        class="w-full"
        mode="click"
        :ui="{ width: 'w-full' }"
        :popper="{ strategy: 'absolute' }"
      >
        <div class="flex grow gap-1.5">
          <els-avatar
            size="lg"
            :src="user.data.attributes.image?.lg || '/images/defaults/avatar.png'"
          />
          <div class="w-full max-w-[235px] flex flex-col items-stretch justify-between">
            <div class="font-medium truncate">
              {{ settings.data.attributes.first_name }} {{ settings.data.attributes.last_name }}
            </div>
            <div class="text-muted text-sm truncate mb-1">
              {{ user.data.attributes.email }}
            </div>
          </div>
        </div>
      </els-dropdown>
    </div>
  </div>
</template>
