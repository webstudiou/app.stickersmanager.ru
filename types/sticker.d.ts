declare global {
  namespace Stickers {
    interface BrowserDefaultItem {
      data: {
        id: string
        type: 'sticker'
        attributes: {
          id: number
          title: string
        }
        relationships: {

        }
        timestamps: {
          start_at: string
          end_at: string
        }
      }
    }
    type D_BrowserDefaultItem = api.MetApiResponse<{ data: BrowserDefaultItem }>

    interface BrowserDefaultItems {
      data: BrowserDefaultItem[]
    }

    type D_BrowserDefaultItems = api.MetApiResponse<{ data: BrowserDefaultItems }>

    interface Sticker {
      data: {
        id: string
        type: 'sticker'
        attributes: {
          id: number
          title: string
          description: string
        }
        relationships: {
          creator: Users.Member
        }
        timestamps: Models.Timestamps & {
          start_at: string
          end_at: string
        }
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
