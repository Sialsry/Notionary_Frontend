import React, { useState } from 'react';
import styled from 'styled-components';

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 360px;
  overflow: hidden;
  border-radius: 12px;
  background-color: black;
`;

const Media = styled.div`
  width: 100%;
  video, img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  border: none;
  color: white;
  padding: 8px;
  cursor: pointer;
  z-index: 1;
  ${({ direction }) => (direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
`;

const MediaSlider = ({ images = [], videos = [] }) => {
  const mediaItems = [...images.map((url) => ({ type: 'image', url })), ...videos.map((url) => ({ type: 'video', url }))];
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
        </>
      )}
    </SliderWrapper>
  );
};

export default MediaSlider;
