import React from 'react'
import styled from 'styled-components'

const ButtonWrap = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #a5e927;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`

const Button = ({ children, onClick }) => {
  return (
    <ButtonWrap onClick={onClick}>
      {children}
    </ButtonWrap>
  )
}

export default Button
