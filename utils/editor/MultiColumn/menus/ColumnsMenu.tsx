import { BubbleMenu as BaseBubbleMenu, useEditorState } from '@tiptap/vue-3'
import { sticky } from 'tippy.js'
import { v4 as uuid } from 'uuid'

import { ColumnLayout } from '../Columns'
import { getRenderContainer } from '../lib'
import type { MenuProps } from '@/components/menus/types'
import { Toolbar } from '@/components/ui/Toolbar'
import { Icon } from '@/components/ui/Icon'

export const ColumnsMenu = ({ editor, appendTo }: MenuProps) => {
  const getReferenceClientRect = () => {
    const renderContainer = getRenderContainer(editor, 'columns')
    return renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
  }

  const shouldShow = () => {
    return editor.isActive('columns')
  }

  const onColumnLeft = () => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run()
  }

  const onColumnRight = () => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run()
  }

  const onColumnTwo = () => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run()
  }
  const { isColumnLeft, isColumnRight, isColumnTwo } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isColumnLeft: ctx.editor.isActive('columns', { layout: ColumnLayout.SidebarLeft }),
        isColumnRight: ctx.editor.isActive('columns', { layout: ColumnLayout.SidebarRight }),
        isColumnTwo: ctx.editor.isActive('columns', { layout: ColumnLayout.TwoColumn }),
      }
    },
  })

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: 'popper',
      }}
    >
      <Toolbar.Wrapper>
        <Toolbar.Button tooltip="Sidebar left" active={isColumnLeft} onClick={onColumnLeft}>
          <Icon name="PanelLeft" />
        </Toolbar.Button>
        <Toolbar.Button tooltip="Two columns" active={isColumnTwo} onClick={onColumnTwo}>
          <Icon name="Columns2" />
        </Toolbar.Button>
        <Toolbar.Button tooltip="Sidebar right" active={isColumnRight} onClick={onColumnRight}>
          <Icon name="PanelRight" />
        </Toolbar.Button>
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  )
}

export default ColumnsMenu
