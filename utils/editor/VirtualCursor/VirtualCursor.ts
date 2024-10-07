import { Extension } from '@tiptap/core'
import type { TrailingNodeOptions } from '~/utils/editor/TrailingNode'

export const VirtualCursor = Extension.create<TrailingNodeOptions>({
  name: 'virtualCursor',
})
