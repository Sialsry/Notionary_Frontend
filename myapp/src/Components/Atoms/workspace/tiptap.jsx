import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import styled from 'styled-components'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

// Styled wrappers
const TaskListWrapper = styled.div`
  width:709px;
  * {
  margin : 0;
  }
  table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
  }
  .Contents {
    width: 709.99px;
    /* height: 28px; */
    min-height: 29.99px;
    padding: 3px 2px;
    box-sizing: border-box;
    border : 1px solid #c7c7c7;
    outline: none;
    font-size: 16px;
    white-space: pre-wrap;
    overflow : hidden;
    resize: none;
    display: block;
    /* margin-left: 60px; */
    box-sizing:border-box;
    /* position: absolute; */
  }

  ul[data-type='taskList'] {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box
  }

  ul[data-type='taskList'] li {
    height: 21px;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin: 0;
    padding: 0;
     list-style: none;
     box-sizing: border-box;
  }
  [data-type="taskList"] label {
  margin-right: 0.5rem; /* optional: space between checkbox and text */
  }

  [data-type="taskList"] div {
    margin: 0;
    padding: 0;
  }

  [data-type="taskList"] p {
    margin: 0;
    padding: 0;
  }
  .mb-2 {
    display:none;
  }
`
const TiptapEditor = ({inputValue, textareaRef, Block, index, setistitleFocused}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // disable built-in heading to replace it
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TaskList,
      TaskItem,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ]
    
  })

  if (!editor) return null

  return (
    <TaskListWrapper>
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
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>
        <button onClick={() => editor.chain().focus().toggleTaskList().run()}>
          To-do List
        </button>
             <button
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          Insert Table
        </button>

        <button onClick={() => editor.chain().focus().deleteTable().run()}>
          Delete Table
        </button>

        <button onClick={() => editor.chain().focus().addRowAfter().run()}>
          Add Row After
        </button>

        <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
          Add Column Before
        </button>
      </div>
      <div className='Contents'>
        <EditorContent editor={editor} {...inputValue} 
            value={Block[index]}
            onFocus={() => setistitleFocused(false)} 
            ref={(el) => textareaRef.current[index] = el} 
            data-index={index} type="text" 
            key={index}/>
      </div>
    </TaskListWrapper>
  )
}

export default TiptapEditor