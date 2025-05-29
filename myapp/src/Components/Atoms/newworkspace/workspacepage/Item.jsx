import React, { useEffect } from 'react'
import styled from 'styled-components'
import useSelecttitle from '../../../../Hooks/workspace/useSelecttitle'

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
    .suggesttitle {
      font-size: 14px;
      font-weight: 400;
      color: #7c7c7c;
      margin: 5px;
      display: inline-block;
      padding: 20px;
    }
    /* .itemtitle {
      display: inline-block;
    } */
`

const Item = ({ icon, title, setitemactive, setSelecttitle }) => {

  return (<>
            <div className='suggesttitle'>suggestions</div>
              {icon.map((el, index) =>
                <Itemwrap key={index} onClick={() => {
                  // setSelecttitle(title[index])
                  // setitemactive("false")
                }} >
                <img src={el ? el : ""} alt="" />
                <div className='itemtitle' >{title[index]}</div>
                </Itemwrap>
              )}
          </>
  )
}

export default Item
