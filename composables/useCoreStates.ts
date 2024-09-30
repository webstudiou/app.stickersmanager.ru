import { createSharedComposable } from '@vueuse/core'

const _useCoreStates = () => {
  const route = useRoute()

  const isSidebarOpened = ref(false)
  const isNotificationsOpened = ref(false)

  const isBrowserProjectModalOpened = ref(false)
  const isBrowserFolderModalOpened = ref(false)

  watch(() => route.path, () => {
    isSidebarOpened.value = false
    isNotificationsOpened.value = false

    isBrowserProjectModalOpened.value = false
    isBrowserFolderModalOpened.value = false
  })

  return {
    isSidebarOpened,
    isNotificationsOpened,

    isBrowserProjectModalOpened,
    isBrowserFolderModalOpened,
  }
}

export const useCoreStates = createSharedComposable(_useCoreStates)
