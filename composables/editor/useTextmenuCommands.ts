// import type { Language } from '@/extensions/Ai'
import type { Editor } from '@tiptap/vue-3'

export const useTextmenuCommands = (editor: Editor) => {
  const onBold = () => editor.chain().focus().toggleBold().run()
  /* const onItalic = () => editor.chain().focus().toggleItalic().run()
    const onStrike = () => editor.chain().focus().toggleStrike().run()
    const onUnderline = () => editor.chain().focus().toggleUnderline().run()
    const onCode = () => editor.chain().focus().toggleCode().run()
    const onCodeBlock = () => editor.chain().focus().toggleCodeBlock().run()

    const onSubscript = () => editor.chain().focus().toggleSubscript().run(), [editor])
    const onSuperscript = () => editor.chain().focus().toggleSuperscript().run(), [editor])
    const onAlignLeft = () => editor.chain().focus().setTextAlign('left').run(), [editor])
    const onAlignCenter = () => editor.chain().focus().setTextAlign('center').run(), [editor])
    const onAlignRight = () => editor.chain().focus().setTextAlign('right').run(), [editor])
    const onAlignJustify = () => editor.chain().focus().setTextAlign('justify').run(), [editor])

    const onChangeColor = (color: string) => editor.chain().setColor(color).run(), [editor])
    const onClearColor = () => editor.chain().focus().unsetColor().run(), [editor])

    const onChangeHighlight = (color: string) => editor.chain().setHighlight({ color }).run(), [editor])
    const onClearHighlight = () => editor.chain().focus().unsetHighlight().run(), [editor])

    const onSimplify =
        () => editor.chain().focus().aiSimplify({ stream: true, format: 'rich-text' }).run(),
        [editor],
    )
    const onEmojify = useCalack(
        () => editor.chain().focus().aiEmojify({ stream: true, format: 'rich-text' }).run(),
        [editor],
    )
    const onCompleteSentence = useCallback(
        () => editor.chain().focus().aiComplete({ stream: true, format: 'rich-text' }).run(),
        [editor],
    )
    const onFixSpelling = useCallback(
        () => editor.chain().focus().aiFixSpellingAndGrammar({ stream: true, format: 'rich-text' }).run(),
        [editor],
    )
    const onMakeLonger = useCallback(
        () => editor.chain().focus().aiExtend({ stream: true, format: 'rich-text' }).run(),
        [editor],
    )
    const onMakeShorter = useCallback(
        () => editor.chain().focus().aiShorten({ stream: true, format: 'rich-text' }).run(),
        [editor],
    )
    const onTldr = useCallback(() => editor.chain().focus().aiTldr({ stream: true, format: 'rich-text' }).run(), [editor])
    const onTone = useCallback(
        (tone: string) => editor.chain().focus().aiAdjustTone(tone, { stream: true, format: 'rich-text' }).run(),
        [editor],
    )
    const onTranslate = useCallback(
        (language: Language) => editor.chain().focus().aiTranslate(language, { stream: true, format: 'rich-text' }).run(),
        [editor],
    )
    const onLink = useCallback(
        (url: string, inNewTab?: boolean) =>
            editor
                .chain()
                .focus()
                .setLink({ href: url, target: inNewTab ? '_blank' : '' })
                .run(),
        [editor],
    )

    const onSetFont = useCallback(
        (font: string) => {
            if (!font || font.length === 0) {
                return editor.chain().focus().unsetFontFamily().run()
            }
            return editor.chain().focus().setFontFamily(font).run()
        },
        [editor],
    )

    const onSetFontSize = useCallback(
        (fontSize: string) => {
            if (!fontSize || fontSize.length === 0) {
                return editor.chain().focus().unsetFontSize().run()
            }
            return editor.chain().focus().setFontSize(fontSize).run()
        },
        [editor],
    ) */

  return {
    onBold,
    /* onItalic,
        onStrike,
        onUnderline,
        onCode,
        onCodeBlock,
        onSubscript,
        onSuperscript,
        onAlignLeft,
        onAlignCenter,
        onAlignRight,
        onAlignJustify,
        onChangeColor,
        onClearColor,
        onChangeHighlight,
        onClearHighlight,
        onSetFont,
        onSetFontSize,
        onSimplify,
        onEmojify,
        onCompleteSentence,
        onFixSpelling,
        onMakeLonger,
        onMakeShorter,
        onTldr,
        onTone,
        onTranslate,
        onLink, */
  }
}
