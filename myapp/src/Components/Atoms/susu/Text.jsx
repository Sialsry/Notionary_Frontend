import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  font-size: ${({ fontSize }) => fontSize || '16px'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  color: black;
`;

const Text = ({ fontSize, width, height, children }) => {
  return (
    <Wrap fontSize={fontSize} width={width} height={height}>
      {children}
    </Wrap>
  );
};

export default Text;
