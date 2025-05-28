import React from 'react'
import styled from 'styled-components'


const Wrap = styled.div`
    width: ${({width}) => width ? width : "auto"};
    height: ${({height}) => height ? height : "auto"};
    background-color: #fff;
    border : ${({border}) => border ? border : "2px"};
    border-radius: 5px;
    box-sizing: border-box;
`


const Input = ({width, height, type, label, multiple, border, placeholder, value, onChange, onKeyDown}) => {
  return (
    <Wrap width={width} height={height}  label={label}>
      <input type={type} placeholder={placeholder} multiple={multiple}  border={border} value={value} onChange={onChange} onKeyDown={onKeyDown}/>
    </Wrap>
  )
}



export default Input
