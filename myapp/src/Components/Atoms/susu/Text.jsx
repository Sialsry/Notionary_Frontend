import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  font-size: ${({ fontSize }) => fontSize || '16px'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Text = ({ fontSize, width, height, children }) => {
  return (
    <Wrap fontSize={fontSize} width={width} height={height}>
      {children}
    </Wrap>
  );
};

export default Text;
