import { createSharedComposable } from '@vueuse/core'

const _useCoreStates = () => {
  const route = useRoute()

  const isSidebarOpened = ref(false)
  const isNotificationsOpened = ref(false)

  const isBrowserProjectModalOpened = ref(false)
  const isBrowserFolderModalOpened = ref(false)

  const isStickerEditorOpened = ref(false)
  const stickerEditorId = ref('')

  watch(() => route.path, () => {
    isSidebarOpened.value = false
    isNotificationsOpened.value = false

    isBrowserProjectModalOpened.value = false
    isBrowserFolderModalOpened.value = false

    isStickerEditorOpened.value = false
    stickerEditorId.value = ''
  })

  return {
    isSidebarOpened,
    isNotificationsOpened,

    isBrowserProjectModalOpened,
    isBrowserFolderModalOpened,

    isStickerEditorOpened,
    stickerEditorId,
  }
}

export const useCoreStates = createSharedComposable(_useCoreStates)
