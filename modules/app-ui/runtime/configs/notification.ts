import icons from './icons'
import fonts from './fonts'
import rounded from './rounded'
import sizes from './sizes'

export default {
  ...icons,
  ...fonts,
  ...rounded,
  ...sizes,
  wrapper: 'w-full pointer-events-auto transition-transform duration-500',
  container: 'relative overflow-hidden',
  color: {
    primary: 'bg-primary text-white/90',
    danger: 'bg-danger text-white/90',
    success: 'bg-success text-white/90',
    warning: 'bg-warning text-white/90',
    default: 'bg-backgrounds-primary text-labels-primary/90',
  },
  progress: 'absolute bottom-0 end-0 start-0 h-1',
  transition: {
    enterActiveClass: 'transform ease-out duration-500 transition',
    enterFromClass: 'translate-y-2.5 opacity-0 mobile:translate-y-0 mobile:translate-x-2.5',
    enterToClass: 'translate-y-0 opacity-100 mobile:translate-x-0',
    leaveActiveClass: 'transition ease-in duration-500',
    leaveFromClass: 'opacity-100',
    leaveToClass: 'opacity-0',
  },
}
