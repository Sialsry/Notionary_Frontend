// TiptapEditor.js
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: `
      <h1>Hello Tiptap</h1>
      <ul><li>Bullet list item</li></ul>
      <ol><li>Numbered list item</li></ol>
      <p><u>Underline</u> and <strong>bold</strong> text</p>
    `,
  });

  if (!editor) return null;

  return (
    <div>
      {/* Toolbar buttons */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>Numbered List</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
      </div>

      {/* Editor area */}
      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;