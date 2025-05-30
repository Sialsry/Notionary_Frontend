import React, { useState } from 'react';
import styled from 'styled-components';

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 360px;
  overflow: hidden;
  border-radius: 16px;
  background-color: #000;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
`;

const Media = styled.div`
  width: 100%;
  height: 100%;
  transition: opacity 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 12px;
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;
  font-size: 20px;
  backdrop-filter: blur(4px);
  transition: background 0.3s;

  ${({ direction }) => (direction === 'left' ? 'left: 12px;' : 'right: 12px;')}

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const Indicator = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.4);
  padding: 4px 10px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
`;

const MediaSlider = ({ images = [], videos = [] }) => {
  const mediaItems = [
    ...images.map((url) => ({ type: 'image', url })),
    ...videos.map((url) => ({ type: 'video', url })),
  ];
  const [index, setIndex] = useState(0);
  const total = mediaItems.length;

  const prev = () => setIndex((prev) => (prev - 1 + total) % total);
  const next = () => setIndex((prev) => (prev + 1) % total);

  if (!mediaItems.length) return null;

  const current = mediaItems[index];

  return (
    <SliderWrapper>
      <Media>
        {current.type === 'image' ? (
          <img src={current.url} alt={`media-${index}`} />
        ) : (
          <video src={current.url} controls autoPlay muted />
        )}
      </Media>

      {total > 1 && (
        <>
          <Arrow direction="left" onClick={prev}>‹</Arrow>
          <Arrow direction="right" onClick={next}>›</Arrow>
          <Indicator>{index + 1} / {total}</Indicator>
        </>
      )}
    </SliderWrapper>
  );
};

export default MediaSlider;
