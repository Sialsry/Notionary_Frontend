import React from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = 'auto' }) => height};
  padding: ${({ padding = '8px' }) => padding};
  font-size: ${({ fontSize = '16px' }) => fontSize};
  font-weight: ${({ fontWeight = '16px' }) => fontWeight};
  border: 1px solid ${({ borderColor = '#ccc' }) => borderColor};
  border-radius: ${({ borderRadius = '4px' }) => borderRadius};
  resize: none;
  box-sizing: border-box;
  color: ${({ color = '#000' }) => color};
`;

const Textarea = ({ width, height, padding, fontSize, fontWeight, borderRadius,borderColor, color, value, onChange}) => {
  return (
    <StyledTextarea
      width={width}
      height={height}
      padding={padding}
      fontSize={fontSize}
      fontWeight={fontWeight}
      borderRadius={borderRadius}
      borderColor={borderColor}
      color={color}
      value={value}
      onChange={onChange}
    />
  );
};

export default Textarea;
