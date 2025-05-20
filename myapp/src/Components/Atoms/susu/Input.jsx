import React from 'react'
import styled from 'styled-components'


const Wrap = styled.div`
    width: ${({width}) => width ? width : "auto"};
    height: ${({height}) => height ? height : "auto"};
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
`


const Input = ({width, height, label, placeholder}) => {
  return (
    <Wrap width={width} height={height}  label={label}>
      <input type="text" placeholder={placeholder} />
    </Wrap>
  )
}



export default Input
