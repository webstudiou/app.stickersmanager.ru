declare global {
  namespace Portfolios {
    interface NavigatorItem {
      id: string
      type: 'portfolio' | 'project'
      title: string
      sort: number
      children?: NavigatorItem[]
      collapsed?: boolean
      disabled: boolean
    }

    interface NavigatorItems {
      data: NavigatorItem[]
    }

    type D_NavigatorItems = api.MetApiResponse<{ data: NavigatorItems }>
  }
}

export {}
