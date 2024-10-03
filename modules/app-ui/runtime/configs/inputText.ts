import icons from './icons'
import fonts from './fonts'
import rounded from './rounded'
import sizes from './sizes'

export default {
  ...fonts,
  ...rounded,
  ...sizes,
  ...icons,
  wrapper: 'inline-flex flex-col gap-1.5',
  fluid: 'w-full',
  contents: {
    base: 'flex self-stretch gap-2.5 relative border border-transparent',
    inner: 'relative w-full overflow-hidden',
    label: 'absolute left-0 top-1/2 right-auto pointer-events-none w-full text-muted truncate transition',
  },
  label: 'pointer-events-none w-full truncate text-sm opacity-75 select-none',
  input: 'outline-none flex-auto min-w-0 h-full w-full border-0 border-transparent p-0 m-0 truncate select-auto caret-primary',
  bg: 'bg-gray-6 dark:bg-backgrounds-primary',
  error: 'border-danger',
  iconsWrapper: 'flex items-center self-stretch rounded-inherit',
}
