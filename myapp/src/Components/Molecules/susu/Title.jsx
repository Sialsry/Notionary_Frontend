import React from 'react'
import Text from '../../Atoms/susu/Text'
import styled from 'styled-components'

const TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
`

const Title = ({ width, height, fontSize, children }) => {
  return (
    <TitleWrap width={width} height={height}>
      <Text fontSize={fontSize}>{children}</Text>
    </TitleWrap>
  )
}

export default Title
