import { DragHandle as BaseDragHandle } from '@tiptap-pro/extension-drag-handle'

export const DragHandle = BaseDragHandle.configure({
  render() {
    const el = document.createElement('div')
    const elButton = document.createElement('button')

    el.appendChild(elButton)
    el.classList.add('drag-handle')
    return el
  },
})

export default DragHandle
