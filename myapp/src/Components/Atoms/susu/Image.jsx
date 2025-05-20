import React from 'react';
import styled from 'styled-components';

const ImageWrap = styled.div`
  display: inline-block;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  overflow: hidden;
  border-radius: 8px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; 
`;

const Image = ({ src, alt, width, height, className }) => {
  return (
    <ImageWrap width={width} height={height} className={className}>
      <StyledImg src={src} alt={alt} />
    </ImageWrap>
  );
};

export default Image;
