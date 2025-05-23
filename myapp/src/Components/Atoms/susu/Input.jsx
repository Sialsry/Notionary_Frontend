import React from 'react'
import styled from 'styled-components'


const Wrap = styled.div`
    width: ${({width}) => width ? width : "auto"};
    height: ${({height}) => height ? height : "auto"};
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
`


const Input = ({width, height, type, label, multiple, placeholder}) => {
  return (
    <Wrap width={width} height={height}  label={label}>
      <input type={type} placeholder={placeholder} multiple={multiple}/>
    </Wrap>
  )
}



export default Input
