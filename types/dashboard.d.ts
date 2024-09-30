declare global {
  namespace Dashboards {
    interface Dashboard {
      data: {
        id: string
        type: 'dashboard'
        attributes: {
          title: string
        }
      }
    }

    interface NavigatorItem {
      data: {
        id: string
        type: 'dashboard'
        attributes: {
          title: string
          description: string
        }
      }
    }
    interface NavigatorItems {
      data: NavigatorItem[]
    }

    type D_NavigatorItems = api.MetApiResponse<{ data: NavigatorItems }>
  }
}

export {}
