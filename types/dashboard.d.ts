declare global {
  namespace Dashboards {
    interface Dashboard {
      data: {
        id: string
        type: 'dashboard'
        attributes: {
          title: string
        }
        relationships: {
          subscription: Subscriptions.Subscription
        }
        restrictions: {
          settings: {
            index: boolean
          }
        }
        limits: Limits
      }
    }

    interface Limit {
      use: number
      total: number
      percentage: number
    }

    interface Limits {
      max_projects: Limit
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
