import rounded from './rounded'
import sizes from './sizes'

export default {
  rounded: {
    xxs: 'rounded-xs',
    ...rounded.rounded,
  },
  wrapper: 'flex items-center justify-start w-full',
  items: {
    base: 'flex w-full',
    height: {
      xxs: 'h-[calc(theme(height.xs)*0.5)]',
      ...sizes.height,
    },
    bg: 'bg-gray-6',
    animated: 'animate-skeleton bg-[length:400%_100%] bg-[linear-gradient(90deg,_rgb(var(--color-gray-6))_25%,_rgb(var(--color-gray-5))_37%,_rgb(var(--color-gray-6))_63%)]',
    first: 'w-1/3',
    last: 'w-2/3',
    el: {
      div: 'w-full',
    },
  },
}

/*

.el-skeleton__circle {
    border-radius: 50%;
    width: var(--el-skeleton-circle-size);
    height: var(--el-skeleton-circle-size);
    line-height: var(--el-skeleton-circle-size)
}

.el-skeleton__button {
    height: 40px;
    width: 64px;
    border-radius: 4px
}

.el-skeleton__text {
    width: 100%;
    height: var(--el-font-size-small)
}

.el-skeleton__caption {
    height: var(--el-font-size-extra-small)
}

.el-skeleton__h1 {
    height: var(--el-font-size-extra-large)
}

.el-skeleton__h3 {
    height: var(--el-font-size-large)
}

.el-skeleton__h5 {
    height: var(--el-font-size-medium)
}

.el-skeleton__image {
    width: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0
}

.el-skeleton__image svg {
    color: var(--el-svg-monochrome-grey);
    fill: currentColor;
    width: 22%;
    height: 22%
}

.el-skeleton {
    --el-skeleton-color: var(--el-fill-color);
    --el-skeleton-to-color: var(--el-fill-color-darker)
}

.el-skeleton__first-line,.el-skeleton__paragraph {
    height: 16px;
    margin-top: 16px;
    background: var(--el-skeleton-color)
}

 */
