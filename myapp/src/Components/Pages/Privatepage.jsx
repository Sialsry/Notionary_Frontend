import React from 'react'
import styled from 'styled-components'
import Sidebar from '../Templates/Sidebar'
import PageDesign from '../Templates/newworkspace/PageDesign'

const Pagewrap = styled.div`
    
    .Pagedesign{
        width: 1650px;
        margin-top: 80px;
        margin-left: 240px;
        min-height: calc(100vh - 80px);
        padding: 80px 235px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 20px;
        
    }
    
`

const Privatepage = () => {
  return (
    <Pagewrap>
      <Sidebar />
      <div className='Pagedesign'>  
            <PageDesign />
            <PageDesign />
            <PageDesign />
            <PageDesign />
            <PageDesign />
          
           
        
      </div>
    </Pagewrap>
  )
}

export default Privatepage
