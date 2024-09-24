<script setup lang="ts">
import { useStoreConfigs } from '~/stores'
import { useCoreStates } from '~/composables'

const storeConfigs = useStoreConfigs()
const loading = computed(() => storeConfigs.loading)

const { isSidebarOpened, isNotificationsOpened } = useCoreStates()
const isSidebar = computed({
  get() {
    return isSidebarOpened.value
  },
  set(value) {
    isSidebarOpened.value = value
  },
})
const isNotifications = computed({
  get() {
    return isNotificationsOpened.value
  },
  set(value) {
    isNotificationsOpened.value = value
  },
})

provide('isSidebar', isSidebar)
provide('isNotifications', { isNotifications })
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden bg-backgrounds-secondary/50">
    <client-only fallback-tag="div">
      <template v-if="loading">
        <!-- Loader -->
        <div class="flex flex-center w-full h-full">
          <els-spinner />
        </div>
      </template>

      <template v-else>
        <!-- Layout -->
        <app-sidebar />
        <div class="flex flex-1 w-full min-w-0 border-l border-backgrounds-secondary">
          <div class="flex-col items-stretch relative w-full flex-1 flex">
            <app-header />
            <slot />
            <els-notifications />
          </div>
        </div>

        <els-slideover
          v-model="isSidebar"
          appear
          side="left"
          class="tablet:hidden"
        >
          <div class="flex grow justify-between overflow-hidden">
            <div class="flex flex-col w-full items-stretch relative flex-shrink-0 bg-backgrounds-primary p-2.5">
              <app-sidebar-slave-header />
              <app-sidebar-services />
              <app-sidebar-slave-footer />
            </div>
          </div>
        </els-slideover>

        <els-slideover
          v-model="isNotifications"
          appear
          side="right"
          :ui="{ width: 'tablet:max-w-[500px]' }"
        >
          <app-notifications />
        </els-slideover>
      </template>

      <template #fallback>
        <!-- Fallback -->
        <div class="flex flex-center w-full h-full">
          <els-spinner />
        </div>
      </template>
    </client-only>
  </div>
</template>
