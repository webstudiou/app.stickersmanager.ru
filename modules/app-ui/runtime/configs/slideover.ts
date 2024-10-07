export default {
  wrapper: 'fixed inset-0 flex z-15',
  overlay: {
    base: 'fixed inset-0 transition-opacity',
    background: 'bg-black/75 dark:bg-black/80',
    transition: {
      enter: 'ease-in-out duration-500',
      enterFrom: 'opacity-0',
      enterTo: 'opacity-100',
      leave: 'ease-in-out duration-500',
      leaveFrom: 'opacity-100',
      leaveTo: 'opacity-0',
    },
  },
  base: 'relative flex-1 flex flex-col w-full focus:outline-none',
  background: 'bg-backgrounds-primary',
  ring: '',
  rounded: '',
  padding: '',
  shadow: 'shadow',
  width: 'w-full max-w-full',
  height: 'h-full max-h-md',
  translate: {
    base: 'translate-x-0',
    left: '-translate-x-full rtl:translate-x-full',
    right: 'translate-x-full rtl:-translate-x-full',
    top: '-translate-y-full',
    bottom: 'translate-y-full',
  },
  transition: {
    enter: 'transform transition ease-in-out duration-300',
    leave: 'transform transition ease-in-out duration-220',
  },
}
