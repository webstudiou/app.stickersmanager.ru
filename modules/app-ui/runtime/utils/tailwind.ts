import { defu, createDefu } from 'defu'
import { extendTailwindMerge } from 'tailwind-merge'

const customTwMerge = extendTailwindMerge<string, string>({
  extend: {
    classGroups: {
      icons: [(classPart: string) => /^i-/.test(classPart)],
    },
  },
})

const defuTwMerge = createDefu((obj, key, value, namespace) => {
  if (namespace === 'default' || namespace.startsWith('default.')) {
    return false
  }
  if (namespace === 'popper' || namespace.startsWith('popper.')) {
    return false
  }
  if (namespace.endsWith('avatar') && key === 'size') {
    return false
  }
  if (namespace.endsWith('chip') && key === 'size') {
    return false
  }
  if (namespace.endsWith('badge') && (key === 'size' || key === 'color' || key === 'variant')) {
    return false
  }
  if (typeof obj[key] === 'string' && typeof value === 'string' && obj[key] && value) {
    // @ts-expect-error
    obj[key] = customTwMerge(obj[key], value)
    return true
  }
})

export function mergeConfig<T>(strategy: Strategy, ...configs: any[]): T {
  if (strategy === 'override') {
    return defu({}, ...configs) as T
  }

  return defuTwMerge({}, ...configs) as T
}

export { twMerge, twJoin } from 'tailwind-merge'
export { defu }
