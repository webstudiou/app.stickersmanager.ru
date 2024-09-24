import icons from './icons'
import fonts from './fonts'
import rounded from './rounded'
import sizes from './sizes'
import { arrow } from './popper'

export default {
  ...rounded,
  ...fonts,
  ...sizes,
  ...icons,
  wrapper: 'inline-flex flex-col gap-1.5',
  fluid: 'w-full',
  trigger: 'flex items-center w-full',
  placeholder: 'pointer-events-none w-full text-muted truncate',
  select: 'relative block w-full disabled:cursor-not-allowed focus:outline-none border-0 inline-flex items-center text-left cursor-default gap-2.5 select-none',
  icon: {
    leading: {
      wrapper: 'absolute inset-y-0 start-0 flex items-center',
      pointer: 'pointer-events-none',
    },
    trailing: {
      wrapper: 'absolute inset-y-0 end-0 flex items-center transition-all',
      pointer: 'pointer-events-none',
    },
  },
  bg: 'bg-gray-6 dark:bg-backgrounds-primary',
  paddingStart: {
    xs: 'ps-[calc(theme(padding.2)_+_0.725rem)]',
    sm: 'ps-[calc(theme(padding.4)_+_0.925rem)]',
    md: 'ps-[calc(theme(padding.6)_+_1.15rem)]',
    lg: 'ps-[calc(theme(padding.8)_+_1.375rem)]',
    xl: 'ps-[calc(theme(padding.10)_+_1.5rem)]',
  },
  paddingEnd: {
    xs: 'pe-[calc(theme(padding.2)_+_0.725rem)]',
    sm: 'pe-[calc(theme(padding.4)_+_0.925rem)]',
    md: 'pe-[calc(theme(padding.6)_+_1.15rem)]',
    lg: 'pe-[calc(theme(padding.8)_+_1.375rem)]',
    xl: 'pe-[calc(theme(padding.10)_+_1.5rem)]',
  },
  transition: {
    leaveActiveClass: 'transition ease-in duration-150',
    leaveFromClass: 'opacity-100',
    leaveToClass: 'opacity-0',
  },
  arrow: {
    ...arrow,
    ring: '',
    background: 'before:bg-backgrounds-primary',
  },
  dropdown: {
    base: 'relative p-1.5 pb-0 focus:outline-none overflow-y-auto scroll-py-1.5 bg-backgrounds-primary',
    ring: '',
    shadow: 'shadow',
    height: 'max-h-[250px]',
  },
  options: {
    base: 'cursor-default select-none relative flex items-center justify-between gap-1.5 transition-colors mb-1.5',
    active: 'text-primary bg-primary-50',
    inactive: '',
    selected: 'text-primary bg-primary-50',
    disabled: 'cursor-not-allowed opacity-50',
    container: 'flex items-center gap-1.5 min-w-0',
  },
}
