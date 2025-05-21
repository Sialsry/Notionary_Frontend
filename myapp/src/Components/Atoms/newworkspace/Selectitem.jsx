import React from 'react'
import styled from 'styled-components'
import { addicon, doticon } from '../../../images'


const  Select = styled.div`
     .addbtn {
        width: 30x;
     
    }
    .dotbtn {
        width: 27px;

    }
`

const Selectitem = (setIsOpen, Block, index) => {
  return (
    <Select>
        <img 
            src={addicon} alt="" className='addbtn' 
            onClick={() => {
            const isOpen = new Array(Block.length).fill("false")
            isOpen[index] = "true"
            setIsOpen([...isOpen])}
        } />
        <img src={doticon} alt="" className='dotbtn'/>
    </Select>
  )
}

export default Selectitem
