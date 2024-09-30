export default {
  wrapper: 'relative z-50',
  inner: 'fixed inset-0 overflow-y-auto',
  container: 'flex min-h-full items-end mobile:items-center justify-center text-center',
  padding: 'p-2.5 mobile:p-0',
  margin: 'mobile:my-5',
  base: 'relative text-left rtl:text-right flex flex-col',
  overlay: {
    base: 'fixed inset-0 transition-opacity',
    background: 'bg-black/75 dark:bg-black/80',
    // Syntax for `<TransitionRoot>` component https://headlessui.com/v1/vue/transition#basic-example
    transition: {
      enter: 'ease-out duration-350',
      enterFrom: 'opacity-0',
      enterTo: 'opacity-100',
      leave: 'ease-in duration-250',
      leaveFrom: 'opacity-100',
      leaveTo: 'opacity-0',
    },
  },
  background: 'bg-white dark:bg-gray-900',
  ring: '',
  rounded: 'rounded-md',
  shadow: 'shadow',
  width: 'w-full mobile:max-w-[500px]',
  height: '',
  fullscreen: 'w-full h-full',
  // Syntax for `<TransitionRoot>` component https://headlessui.com/v1/vue/transition#basic-example
  transition: {
    enter: 'ease-out duration-350',
    enterFrom: 'opacity-0 translate-y-2.5 mobile:translate-y-0 mobile:scale-95',
    enterTo: 'opacity-100 translate-y-0 mobile:scale-100',
    leave: 'ease-in duration-250',
    leaveFrom: 'opacity-100 translate-y-0 mobile:scale-100',
    leaveTo: 'opacity-0 translate-y-2.5 mobile:translate-y-0 mobile:scale-95',
  },
}
