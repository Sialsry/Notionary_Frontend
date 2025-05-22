import React from 'react'
import styled from 'styled-components'

const ButtonWrap = styled.button`
  padding: ${({padding}) => padding ? padding : "10px 20px"};
  margin-top: 20px;
  background-color: #27a2e9;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`

const Button = ({padding, children, onClick }) => {
  return (
    <ButtonWrap padding={padding} onClick={onClick}>
      {children}
    </ButtonWrap>
  )
}

export default Button
