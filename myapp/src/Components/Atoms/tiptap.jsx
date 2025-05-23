import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
  })

  if (!editor) return null

  return (
    <div>
      <div className="mb-2 space-x-2">
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet List
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          Numbered List
        </button>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapEditor