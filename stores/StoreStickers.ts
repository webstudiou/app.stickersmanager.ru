import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreStickers = defineStore('StoreStickers', {
  state: () => ({
    loading: ref<boolean>(true),
    browser: ref<'default' | 'month' | 'week' | 'gantt' | 'matrix'>('default'),
    columns: ref<StickerBrowserDefaultColumns>([
      { key: 'title', visible: true, width: 350, minWidth: 350, resize: false },
      { key: 'id', visible: true, width: 125, minWidth: 125, resize: false },
      { key: 'project', visible: true, width: 175, minWidth: 175, resize: true },
      { key: 'board', visible: true, width: 175, minWidth: 175, resize: true },
      { key: 'column', visible: true, width: 175, minWidth: 175, resize: true },
      { key: 'executor', visible: true, width: 175, minWidth: 175, resize: true },
      { key: 'dates', visible: true, width: 175, minWidth: 175, resize: true },
      { key: 'priority', visible: true, width: 125, minWidth: 125, resize: true },
      { key: 'tags', visible: true, width: 225, minWidth: 225, resize: true },
      { key: 'actions', visible: true, width: 225, minWidth: 225, resize: false },
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
