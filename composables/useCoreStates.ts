import { createSharedComposable } from '@vueuse/core'

const _useCoreStates = () => {
  const route = useRoute()

  const isSidebarOpened = ref(false)
  const isNotificationsOpened = ref(false)

  watch(() => route.path, () => {
    isSidebarOpened.value = false
    isNotificationsOpened.value = false
  })

  return {
    isSidebarOpened,
    isNotificationsOpened,
  }
}

export const useCoreStates = createSharedComposable(_useCoreStates)
