import React from 'react';
import styled from 'styled-components';

const ModalCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  padding: 2.5rem 3rem;
  width: ${({ w }) => w || 'clamp(320px, 40vw, 480px)'};
  height: ${({ h }) => h || 'auto'};
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  color: #222;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    width: 90%;
    max-height: 65vh;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = ({ isOpen, width, height, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalCard
        w={width}
        h={height}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ModalCard>
    </Backdrop>
  );
};

export default Modal;
