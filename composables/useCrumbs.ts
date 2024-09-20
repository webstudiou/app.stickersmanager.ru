import { ref } from 'vue'
import type { RouteParams, RouteRecordName } from 'vue-router'

export interface BreadCrumb {
  name: string
  to?: RouteRecordName
  params?: RouteParams
}

const list = ref<BreadCrumb[]>([])
const actions = ref<BreadCrumb[]>([])
const title = ref<string>('')
export const useCrumbs = () => {
  const addCrumbs = (crumb: BreadCrumb): void => {
    list.value.push(crumb)
  }

  const setCrumbs = (crumbs: BreadCrumb[]): void => {
    list.value = crumbs
    actions.value = []
  }

  const setTitle = (name: string): void => {
    title.value = name
  }

  const setActions = (crumbs: BreadCrumb[]): void => {
    actions.value = crumbs
  }

  return { list, actions, title, addCrumbs, setCrumbs, setActions, setTitle }
}
