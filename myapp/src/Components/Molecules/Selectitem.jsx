import React from 'react'
import styled from 'styled-components'
import Item from '../Atoms/workspace/Item'
import { addicon, bulletlist, calendar, databasetable, doticon, header,
    numberlist, table,todolist, toggle, togglelist } from '../../images'


const Itemwrap = styled.div`
    width: 280px;
    height: 335.5px;
    border: 1px solid #D3D1CB;
    border-radius: 10px;
    box-shadow: 0 0 15px -12px;
    padding: 10px;

    span { 
      font-size: 14px;
      font-weight: 400;
      color: #7c7c7c;
      margin-bottom: 50px;
      
    }
`

const Selectitem = () => {
  return (
    <Itemwrap>
      <span>suggested</span>
      <div>
        <Item icon={header}>Heading1</Item>
        <Item icon={bulletlist}>Bullet list</Item>
        <Item icon={numberlist}>Numbered list</Item>
        <Item icon={todolist}>To-do checklist</Item>
        <Item icon={togglelist}>Toggle list</Item>
      </div>
    </Itemwrap>
  )
}

export default Selectitem
