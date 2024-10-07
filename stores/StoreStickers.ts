import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useErrorHandler } from '~/composables'

export const useStoreStickers = defineStore('StoreStickers', {
  state: () => ({
    loading: ref<boolean>(true),
    browser: ref<'default' | 'month' | 'week' | 'gantt' | 'matrix' | 'boards'>('default'),
    columns: ref<StickerBrowserDefaultColumns>([
      { key: 'title', visible: true, width: 300, minWidth: 300, resize: true },
      { key: 'id', visible: true, width: 25, minWidth: 25, resize: true },
      { key: 'project', visible: true, width: 125, minWidth: 125, resize: true },
      { key: 'board', visible: true, width: 125, minWidth: 125, resize: true },
      { key: 'column', visible: true, width: 125, minWidth: 125, resize: true },
      { key: 'executor', visible: true, width: 125, minWidth: 125, resize: true },
      { key: 'dates', visible: true, width: 125, minWidth: 125, resize: true },
      { key: 'priority', visible: true, width: 125, minWidth: 125, resize: true },
      { key: 'tags', visible: true, width: 125, minWidth: 125, resize: true },
    ]),
    filters: ref<Record<string, string | number | boolean>>(

    ),
    entries: ref<Stickers.BrowserDefaultItem[]>([]),
    entry: ref<Stickers.Sticker>(),
  }),
  actions: {
    init(): Promise<void> {
      this.loading = true
      this.entries = []
      this.entry = undefined

      return new Promise<void>((resolve) => {
        $fetch('/api/dashboard/stickers')
          .then((res) => {
            this.entries = this.entries.concat(res.data.data)
          })
          .catch(e => useErrorHandler(e))
          .finally(() => {
            this.loading = false
            resolve()
          })
      })
    },
    editor(id: string): Promise<void> {
      this.entry = undefined

      return new Promise<void>((resolve) => {
        $fetch(`/api/dashboard/stickers/${id}`)
          .then((res) => {
            this.entry = res.data
          })
          .catch(e => useErrorHandler(e))
          .finally(() => {
            resolve()
          })
      })
    },
    change(name: string, value: any): Promise<void> {
      if (!this.entry) {
        return
      }

      return new Promise<void>(() => {
        $fetch<api.MetApiResponse>(`/api/dashboard/stickers/${this.entry.data.id}/settings`, {
          method: 'PATCH', body: {
            name: name,
            value: value,
          },
        })
          .catch(e => useErrorHandler(e))
      })
    },
  },
  getters: {

  },
  persist: true,
})
