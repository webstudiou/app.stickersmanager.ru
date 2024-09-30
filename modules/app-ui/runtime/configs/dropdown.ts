import { arrow } from './popper'
import icons from './icons'
import fonts from './fonts'
import rounded from './rounded'
import sizes from './sizes'

export default {
  ...rounded,
  ...fonts,
  ...sizes,
  ...icons,
  wrapper: 'relative inline-flex text-left rtl:text-right',
  container: 'z-15 group',
  trigger: 'inline-flex w-full',
  width: 'min-w-[250px]',
  background: 'bg-backgrounds-primary',
  shadow: 'shadow',
  base: 'relative focus:outline-none overflow-y-auto scroll-py-1',
  divide: 'divide-y divide-separators-opaque/50',
  padding: 'p-1.5 pb-0.5',
  item: {
    base: 'group flex items-center gap-1.5 w-full mb-1',
    active: 'text-primary bg-gray-6',
    inactive: 'hover:text-primary hover:bg-gray-6',
    disabled: 'cursor-not-allowed opacity-50',
    label: 'truncate',
    shortcuts: 'hidden md:inline-flex flex-shrink-0 gap-0.5 ms-auto',
  },
  // Syntax for `<Transition>` component https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
  transition: {
    enterActiveClass: 'transition duration-100 ease-out',
    enterFromClass: 'transform scale-95 opacity-0',
    enterToClass: 'transform scale-100 opacity-100',
    leaveActiveClass: 'transition duration-75 ease-in',
    leaveFromClass: 'transform scale-100 opacity-100',
    leaveToClass: 'transform scale-95 opacity-0',
  },
  popper: {
    placement: 'bottom-end',
    strategy: 'fixed',
  },
  arrow: {
    ...arrow,
    ring: '',
    background: 'before:bg-backgrounds-primary',
  },
}
