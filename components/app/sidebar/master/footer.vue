<script setup lang="ts">
import { config } from './master.vue'
import { useStoreAuth } from '~/stores'

const { ui } = useCore('sidebar', null, config)

const storeAuth = useStoreAuth()
async function handleSignOut() {
  await storeAuth.signout()
}
</script>

<template>
  <div class="flex flex-center flex-shrink-0 min-w-0 h-[--header-height]">
    <els-link
      as="div"
      :class="[ui.buttons.default, 'cursor-pointer']"
      @click="handleSignOut"
    >
      <els-icon
        name="signout"
        size="1.25rem"
      />
    </els-link>
  </div>
</template>
