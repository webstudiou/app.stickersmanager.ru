declare global {
  namespace Portfolios {
    interface NavigatorItem {
      id: string
      type: 'portfolio' | 'project'
      title: string
      sort: number
      children?: NavigatorItem[]
      collapsed?: boolean
      favourite?: boolean
      disabled: boolean
    }
    type D_NavigatorItem = api.MetApiResponse<{ data: NavigatorItem }>

    interface NavigatorItems {
      data: NavigatorItem[]
    }

    type D_NavigatorItems = api.MetApiResponse<{ data: NavigatorItems }>
  }
}

export {}
