import fonts from './fonts'

export default {
  ...fonts,
  wrapper: 'relative flex items-center text-nowrap gap-1.5',
  padding: {
    xs: 'pl-2',
    sm: 'pl-2.5',
    md: 'pl-3',
    lg: 'pl-3.5',
    xl: 'pl-4',
  },
  before: {
    base: 'before:absolute before:top-[50%] before:-translate-y-1/2 before:content-alternates',
    size: {
      xs: 'before:h-[4px] before:w-[4px] before:left-0',
      sm: 'before:h-[6px] before:w-[6px] before:left-0',
      md: 'before:h-[8px] before:w-[8px] before:left-0',
      lg: 'before:h-[10px] before:w-[10px] before:left-0',
      xl: 'before:h-[12px] before:w-[12px] before:left-0',
    },
    rounded: 'before:rounded-full',
    colors: {
      primary: 'before:bg-primary',
      success: 'before:bg-success',
      warning: 'before:bg-warning',
      danger: 'before:bg-danger',
      blue: 'before:bg-blue',
      red: 'before:bg-red',
      orange: 'before:bg-orange',
      yellow: 'before:bg-yellow',
      green: 'before:bg-green',
      mint: 'before:bg-mint',
      teal: 'before:bg-teal',
      cyan: 'before:bg-cyan',
      indigo: 'before:bg-indigo',
      purple: 'before:bg-purple',
      pink: 'before:bg-pink',
    },
  },
}
