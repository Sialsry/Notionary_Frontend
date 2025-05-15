import React from 'react'
import Sidebar from '../Templates/Sidebar'
import styled from 'styled-components'
import Categories from '../Molecules/Categories'

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: max-content;
  background-color: #fff;
`

const Main = () => {
  return (
    <>
      <Sidebar />
    <MainWrap>
      <Categories items={['IT', '기술스택', '디자인', '여행', '기타']}/>
    </MainWrap>
    </>
  )
}

export default Main
