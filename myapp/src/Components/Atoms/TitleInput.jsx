import React from 'react'
import styled from 'styled-components'

const Titlewrap = styled.div`
    input {
        width: ${({width}) => width ? width : '709.99px'};
        height:  ${({height}) => height ? height : '50.99px'};
        padding: 3px 2px;
        box-sizing: border-box;
        border : 1px solid #c7c7c7;
        outline: none;
        font-size: 40px;
    }
`
const TitleInput = () => {
  return (
    <Titlewrap>
      <input type="text" />
    </Titlewrap>
  )
}

export default TitleInput
