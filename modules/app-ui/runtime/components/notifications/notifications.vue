<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: () => ({}),
})

const { ui, attrs } = useCore('notifications', toRef(props, 'ui'), config)

const toast = useToast()
const notifications = useState<Notification[]>('notifications', () => [])

const wrapperClass = computed(() => twMerge(twJoin(ui.value.wrapper, ui.value.position, ui.value.width), props.class))
</script>

<template>
  <teleport to="body">
    <div :class="wrapperClass" role="region" v-bind="attrs">
      <div v-if="notifications.length" :class="ui.container">
        <div v-for="notification of notifications" :key="notification.id">
          <els-notification
            v-bind="notification"
            :class="notification.click && 'cursor-pointer'"
            @click="notification.click && notification.click(notification)"
            @close="toast.remove(notification.id)"
          >
            <template v-for="(_, name) in $slots" #[name]="slotData">
              <slot :name="name" v-bind="slotData" />
            </template>
          </els-notification>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCore, useToast } from '../../composables'
import { mergeConfig, twMerge, twJoin } from '../../utils'
import type { Notification } from '../../types/notification'
import { useState } from '#imports'
import { notifications as el } from '#app-ui/configs'
// @ts-expect-error
import appConfig from '#build/app.config'

const config = mergeConfig<typeof el>(appConfig.ui.strategy, appConfig.ui.notifications, el)

type Props = {
  class?: HTMLAttributes['class']
  ui?: Partial<typeof config> & { strategy?: Strategy }
}
</script>
