import { computed } from 'vue'
import type { ComponentInternalInstance, Ref } from 'vue'
import { isString, isObject, isNil } from 'lodash-unified'

export { isString, isObject, isNil }
export const mutable = <T extends readonly any[] | Record<string, unknown>>(val: T) => val as Mutable<typeof val>
export const checkIndexPath = (path: unknown): path is string[] => Array.isArray(path) && path.every(path => isString(path))

export function useMenu(instance: ComponentInternalInstance, currentId: Ref<string>) {
  const pathId = computed(() => {
    let parent = instance.parent!
    const path = [currentId.value]
    while (parent.type.name !== 'ElsMenu') {
      if (parent.props.id) {
        path.unshift(parent.props.id as string)
      }
      parent = parent.parent!
    }
    return path
  })

  const parent = computed(() => {
    let parent = instance.parent
    while (parent && !['ElsMenu', 'ElsMenuSub'].includes(parent.type.name!)) {
      parent = parent.parent
    }
    return parent!
  })

  return {
    parent,
    pathId,
  }
}
