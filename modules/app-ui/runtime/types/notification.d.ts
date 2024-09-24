import type { Button } from './button'

export type NotificationColor = 'default' | 'primary' | 'success' | 'warning' | 'danger'

export interface NotificationAction extends Button {
  click?: (...args: any[]) => void
}

export interface Notification {
  id: string
  title?: string
  description?: string
  icon?: string
  timeout?: number
  actions?: NotificationAction[]
  click?: (...args: any[]) => void
  callback?: (...args: any[]) => void
  color?: NotificationColor
  ui?: any
}
