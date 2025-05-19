import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

/* ---------- 애니메이션 ---------- */
const openKey = keyframes`
  0%   { transform: scaleY(0);   opacity: 0; }
  100% { transform: scaleY(1);   opacity: 1; }
`;
const closeKey = keyframes`
  0%   { transform: scaleY(1);   opacity: 1; }
  100% { transform: scaleY(0.05); opacity: 0; }
`;


const Backdrop = styled.div`
  position: fixed; inset: 0;
  display: flex; justify-content: center; align-items: center;
  background: rgba(15, 18, 25, 0.55);
  backdrop-filter: blur(4px);
  z-index: 1200;
`;

const ModalCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  padding: 2.5rem 3rem;
  width: ${({ w }) => w || 'clamp(320px, 40vw, 480px)'};
  height: ${({ h }) => h || 'auto'};
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  color: #222;
  overflow-y: auto;
  transform-origin: top center;

  animation: ${({ state }) =>
    state === 'open'
      ? css`${openKey} 0.4s cubic-bezier(0.33, 1, 0.68, 1) forwards`
      : css`${closeKey} 0.35s ease-in forwards`};

  @media (max-width: 768px) {
    width: 90%;
    max-height: 65vh;
  }
`;

/* ---------- 컴포넌트 ---------- */
const Modal = ({ isOpen, width, height, onClose, children }) => {
  const [render, setRender] = useState(isOpen);
  const [state, setState]  = useState('open');

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      setState('open');
    } else {
      setState('close');
      const t = setTimeout(() => setRender(false), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!render) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalCard
        w={width}
        h={height}
        state={state}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </ModalCard>
    </Backdrop>
  );
};

export default Modal;
