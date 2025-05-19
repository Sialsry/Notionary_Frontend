import React from 'react'
import styled from 'styled-components'


const Itemwrap = styled.div`
    &:hover {
      background-color: #dfdfdf;
      border-radius: 5px;
      user-select: none
    }
    width: 280px;
    height: 32px;
    display: flex;
    align-items: center;
    img {
        height: 20px;
        box-sizing: border-box;
        margin-right: 10px;
    }
    /* .itemtitle {
      display: inline-block;
    } */
`

const Item = ({Close, icon, title}) => {
  return (
    icon.map((el, index) =>
    <Itemwrap onClick={Close} >
      <img src={el ? el : ""} alt="" />
      <div className='itemtitle' >{title[index]}</div>
    </Itemwrap>
    )
  )
}

export default Item
