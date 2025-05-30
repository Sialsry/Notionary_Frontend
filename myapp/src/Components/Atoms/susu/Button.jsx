import React from 'react'
import styled from 'styled-components'

const ButtonWrap = styled.button`
  width: 80px;
  height: 40px;
  padding: ${({ padding }) => padding || "10px 10px"};
  margin-top: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor || "#7e57c2"};
  color: white;
  border: none;
  border-radius: 6px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-sizing: border-box;
  cursor: pointer;
`

const Button = ({ padding, backgroundColor, children, onClick }) => {
  return (
    <ButtonWrap padding={padding} backgroundColor={backgroundColor} onClick={onClick}>
      {children}
    </ButtonWrap>
  )
}

export default Button
