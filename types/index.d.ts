import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      access_token: string
      expires_in: string
      token_type: string
      refresh_token: string
    } & DefaultSession['user']
  }
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    appURL: string
    apiURL: string
  }
}

declare global {
    type Theme = 'dark' | 'light' | 'system'
    type Locale = 'ru'
    type TimeFormat = '12h' | '24h'
    type DateFormat = 'MM/DD/YY' | 'DD/MM/YY' | 'MM.DD.YY' | 'DD.MM.YY'
    type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6

    interface PusherOptions {
      broadcaster: 'reverb' | 'pusher'
      host?: string
      port?: number
      scheme: 'http' | 'https'
      cluster?: string
      transports?: string[]
      authentication?: PusherAuth
      logLevel: number
    }

    interface PusherAuth {
      baseUrl: string
      authEndpoint?: string
    }
}

export {}
