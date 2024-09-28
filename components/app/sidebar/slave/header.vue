<script setup lang="ts">
import { useStoreAuth } from '~/stores'

const storeAuth = useStoreAuth()
const dashboard = computed(() => storeAuth.dashboard)

const items = computed(() => {
  const _items = []

  return [_items]
})
</script>

<template>
  <div class="flex items-center flex-shrink-0 min-w-0 tablet:p-2.5 h-[--header-height] border-b border-backgrounds-secondary">
    <els-dropdown
      :items
      class="w-full"
      mode="hover"
      :ui="{ width: 'w-full' }"
      :popper="{ strategy: 'absolute' }"
    >
      <div class="flex gap-1.5 overflow-hidden select-none">
        <!--        <els-avatar size="lg" :src="dashboard.data.attributes.image?.xxxl || '/images/defaults/avatar.png'" /> -->
        <div class="flex flex-col justify-center w-full overflow-hidden">
          <div class="text-subheadline font-medium truncate">
            {{ dashboard.data.attributes.title }}
          </div>
          <div class="text-muted truncate leading-none">
            {{ dashboard.data.attributes.title }}
          </div>
        </div>
      </div>
    </els-dropdown>
  </div>
</template>
