declare global {
  namespace Subscriptions {
    interface MapPlan {
      id: string
      title: string
      price: Map<30 | 365, number>
      max_members?: number
      is_active: boolean
      is_root: boolean
      features: Feature[]
    }

    interface Feature {
      title: string
      strategy: 'max' | 'can' | 'sum'
      price: number
      max: number
    }

    interface Subscription {
      data: {
        id: string
        type: 'subscription'
        attributes: {
          title: string
          members: number
          price: number
          interval: number
          renews_at: string
          ends_at: string
        }
        relationships: {
          plans: any
          sale: number
        }
      }
    }

    type TariffKey = 'free' | 'team' | 'pro' | 'biz'

    interface TariffCalculator {
      [key: 'dashboard' | 'knowledge' | 'storage' | 'stickers']: MapPlan
    }
    type D_TariffCalculator = api.MetApiResponse<{ data: TariffCalculator }>
  }
}

export {}
