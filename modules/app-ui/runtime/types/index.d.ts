import type * as config from './runtime/configs'

interface Color {
  red: { [key: string | number]: string }
  orange: { [key: string | number]: string }
  yellow: { [key: string | number]: string }
  green: { [key: string | number]: string }
  mint: { [key: string | number]: string }
  teal: { [key: string | number]: string }
  cyan: { [key: string | number]: string }
  blue: { [key: string | number]: string }
  indigo: { [key: string | number]: string }
  purple: { [key: string | number]: string }
  pink: { [key: string | number]: string }
  gray: { [key: string | number]: string }
}

declare global {
    type Strategy = 'merge' | 'override'

    type Mutable<T> = { -readonly [P in keyof T]: T[P] }

    interface TightMap<O = any> {
      [key: string]: TightMap | O
    }

    type DeepPartial<T, O = any> = {
      [P in keyof T]?: T[P] extends object
        ? DeepPartial<T[P], O>
        : T[P];
    } & {
      [key: string]: O | TightMap<O>
    }

    type UI = {
      strategy?: Strategy
      primary?: string
      colors?: {
        light?: Color
        dark?: Color
      }
      header?: number
      sidebar?: {
        master?: number
        slave?: number
      }
      rows?: number
      toolbar?: number
      footer?: number
      [key: string]: any
    } & DeepPartial<config, string>
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ui?: UI
  }
}

export {}
