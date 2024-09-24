import type { Link } from './link'

export interface Button extends Link {
  type?: string
  fluid?: boolean
  title?: string
  loading?: boolean
  disabled?: boolean
  noPadding?: boolean
  size?: ELEMENTS.SIZE
  color?: ELEMENTS.COLOR
  variant?: ELEMENTS.VARIANT
  icon?: string
  loaderIcon?: string
  leftIcon?: string
  rightIcon?: string
  trailing?: boolean
  leading?: boolean
  to?: string | object
  target?: string
  square?: boolean
}
