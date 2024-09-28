declare global {
  namespace Stickers {
    interface BrowserDefaultItem {
      data: {
        id: string
        type: 'sticker'
      }
    }

    interface BrowserDefaultItems {
      data: BrowserDefaultItem[]
    }

    type D_BrowserDefaultItems = api.MetApiResponse<{ data: BrowserDefaultItems }>

    interface Sticker {
      data: {
        id: string
        type: 'sticker'
      }
    }
    type D_Sticker = api.MetApiResponse<{ data: Sticker }>

    interface Stickers {
      data: Sticker[]
    }

    type D_Stickers = api.MetApiResponse<{ data: Stickers }>
  }
}

export {}
