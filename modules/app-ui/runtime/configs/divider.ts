export default {
  wrapper: {
    base: 'flex items-center text-center',
    horizontal: 'flex-row w-full',
    vertical: 'flex-col h-full',
  },
  container: {
    base: 'flex',
    horizontal: 'mx-5 whitespace-nowrap',
    vertical: 'my-2.5',
  },
  border: {
    base: 'flex',
    horizontal: 'w-full',
    vertical: 'h-full',
    size: {
      horizontal: {
        xs: 'border-t',
        sm: 'border-t-[2px]',
        md: 'border-t-[3px]',
        lg: 'border-t-[4px]',
        xl: 'border-t-[5px]',
      },
      vertical: {
        xs: 'border-s',
        sm: 'border-s-[2px]',
        md: 'border-s-[3px]',
        lg: 'border-s-[4px]',
        xl: 'border-s-[5px]',
      },
    },
    type: {
      solid: 'border-solid',
      dotted: 'border-dotted',
      dashed: 'border-dashed',
    },
  },
  color: {
    'opaque': 'border-separators-opaque',
    'non-opaque': 'border-separators-non-opaque',
  },
}
