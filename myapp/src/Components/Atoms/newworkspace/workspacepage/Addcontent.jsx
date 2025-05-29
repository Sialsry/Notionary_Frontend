import React from 'react'
import styled from 'styled-components'
import { addicon, doticon } from '../../../../images'


const Contentwrap = styled.div`
    
`

const Addcontent = () => {
  return (
    <Contentwrap>
      <img src={addicon} alt="" className='addbtn' />
        <img src={doticon} alt="" className='dotbtn'/> 
    </Contentwrap>
  )
}




export default Addcontent
