import { computed } from 'vue'
import type { ComponentInternalInstance, Ref } from 'vue'
import { isString, isObject, isNil } from 'lodash-unified'

export { isString, isObject, isNil }
export const mutable = <T extends readonly any[] | Record<string, unknown>>(val: T) => val as Mutable<typeof val>
export const checkIndexPath = (path: unknown): path is string[] => Array.isArray(path) && path.every(path => isString(path))

export function useMenu(instance: ComponentInternalInstance, currentId: Ref<string>) {
  const path = computed(() => {
    let parent = instance.parent!
    const _path = [currentId.value]
    while (parent.type.name !== 'ElsMenu') {
      if (parent.props.id) {
        _path.unshift(parent.props.id as string)
      }
      parent = parent.parent!
    }
    return _path
  })

  const parent = computed(() => {
    let _parent = instance.parent
    while (_parent && !['ElsMenu', 'ElsMenuSub'].includes(_parent.type.name!)) {
      _parent = _parent.parent
    }
    return _parent!
  })

  return {
    parent,
    path,
  }
}
