import React from 'react'
import styled from 'styled-components'
import { addicon, doticon } from '../../../images'


const Contentwrap = styled.div`
    
`

const Addcontent = ({setitemactive, setIsOpen, isOpen, Block, index}) => {
  return (
    <Contentwrap>
      <img src={addicon} alt="" className='addbtn' onClick={() => {
            const isOpen = new Array(Block.length).fill("false")
            isOpen[index] = "true"
            console.log("123")
            setIsOpen([...isOpen])
            setitemactive("true")}
        } />
        <img src={doticon} alt="" className='dotbtn'/> 
    </Contentwrap>
  )
}




export default Addcontent
