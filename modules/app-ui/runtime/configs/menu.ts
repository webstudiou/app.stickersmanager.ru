import rounded from './rounded'
import fonts from './fonts'
import sizes from './sizes'
import icons from './icons'

export default {
  root: {
    wrapper: 'flex flex-col items-start self-stretch overflow-hidden',
  },
  header: {
    wrapper: 'flex items-center justify-start gap-1.5 w-full mt-2.5 mb-1.5',
    title: 'text-md text-muted leading-none max-w-full truncate uppercase',
  },
  item: {
    ...rounded,
    ...fonts,
    ...sizes,
    ...icons,
    wrapper: 'flex items-center justify-start self-stretch disabled:pointer-events-none disabled:opacity-50 outline:none border-0 transition-all px-2.5 mb-1',
    active: 'text-primary bg-gray-6',
    hover: 'hover:text-primary hover:bg-gray-6',
    contents: {
      base: 'inline-flex items-center justify-start gap-1.5 grow overflow-hidden outline-none',
      active: '',
    },
  },
  section: {
    wrapper: 'flex flex-col items-start flex-none self-stretch grow-0 overflow-hidden',
  },
  sub: {
    section: '',
  },
}
