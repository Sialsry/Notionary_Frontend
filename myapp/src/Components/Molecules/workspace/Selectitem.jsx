import React from 'react'
import styled from 'styled-components'
import Item from '../../Atoms/workspace/Item'
import { addicon, bulletlist, calendar, databasetable, doticon, header,
    numberlist, table,todolist, toggle, togglelist } from '../../../images'


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

const Selectitem = ({Close}) => {
  const icon = [header, bulletlist, numberlist, todolist, togglelist]
  const icontitle = ['header', 'bullet list', 'numbered list', 'todo list', 'toggle list']
  return (
    <Itemwrap>
      <span>suggested</span>
      <div>
        <Item icon={icon} title={icontitle} Close={Close}/>
      </div>
    </Itemwrap>
  )
}

export default Selectitem
