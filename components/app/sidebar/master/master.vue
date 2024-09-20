<script setup lang="ts">
import { useStoreConfigs } from '~/stores'

const { ui } = useCore('sidebar', null, config)

const storeConfig = useStoreConfigs()

const { isNotificationSlideOpened } = inject<boolean>('isNotificationOpened', false)
</script>

<template>
  <div class="flex flex-col items-stretch relative flex-shrink-0 w-[--sidebar-master-width] bg-backgrounds-master border-r border-backgrounds-master dark:border-backgrounds-secondary text-white">
    <app-sidebar-master-header />
    <div class="flex flex-col items-center justify-start w-full flex-1 relative overflow-hidden gap-5 my-2.5">
      <els-link
        as="div"
        :to="{ name: 'dashboard' }"
        :class="ui.buttons.default"
        active-class="text-primary"
        :active="storeConfig.service === 'dashboard'"
      >
        <els-icon
          name="dashboard"
          size="1.25rem"
        />
      </els-link>

      <els-link
        as="div"
        :to="{ name: 'staff' }"
        :class="ui.buttons.default"
        active-class="text-primary"
        :active="storeConfig.service === 'staff'"
      >
        <els-icon
          name="staff"
          size="1.25rem"
        />
      </els-link>

      <els-link
        as="div"
        :to="{ name: 'knowledge' }"
        :class="ui.buttons.default"
        active-class="text-primary"
        :active="storeConfig.service === 'knowledge'"
      >
        <els-icon
          name="knowledge"
          size="1.25rem"
        />
      </els-link>

      <els-link
        as="div"
        :to="{ name: 'storage' }"
        :class="ui.buttons.default"
        active-class="text-primary"
        :active="storeConfig.service === 'storage'"
      >
        <els-icon
          name="storage"
          size="1.25rem"
        />
      </els-link>

      <els-link
        as="div"
        :class="ui.buttons.default"
        active-class="text-primary"
        :active="isNotificationSlideOpened"
        @click="isNotificationSlideOpened = !isNotificationSlideOpened"
      >
        <els-icon
          name="notifications"
          size="1.25rem"
        />
      </els-link>

      <els-link
        as="div"
        :to="{ name: 'me' }"
        :class="ui.buttons.default"
        active-class="text-primary"
        :active="storeConfig.service === 'me'"
      >
        <els-icon
          name="me"
          size="1.25rem"
        />
      </els-link>
    </div>
    <app-sidebar-master-footer />
  </div>
</template>

<script lang="ts">
import { mergeConfig } from '#app-ui/utils'

const el = {
  buttons: {
    default: 'rounded h-md w-md leading-none flex items-center justify-center hover:text-primary transition-colors duration-250 focus:outline-none cursor-pointer disabled:pointer-events-none',
  },
}

const appConfig = useAppConfig()
export const config = mergeConfig<typeof el>(appConfig.ui?.strategy as Strategy, null, el)
</script>
