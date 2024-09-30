import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreStickers = defineStore('StoreStickers', {
  state: () => ({
    loading: ref<boolean>(true),
    browser: ref<'default' | 'month' | 'week' | 'gantt' | 'matrix'>('default'),
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

  },
  getters: {

  },
  persist: true,
},
)
