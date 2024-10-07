import {
  Document,
  Focus,
  Heading,
  Placeholder,
  StarterKit,
  TrailingNode,
} from '.'

export const ExtensionKit = () => [
  Document,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  StarterKit.configure({
    document: false,
    dropcursor: true,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  TrailingNode,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  Focus,
]

export default ExtensionKit
