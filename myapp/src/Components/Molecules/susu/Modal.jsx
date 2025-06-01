import React from "react";
import styled from "styled-components";

const ModalCard = styled.div`
  background: white;
  padding: 3rem;
  width: ${({ w }) => w || "clamp(320px, 40vw, 480px)"};
  height: ${({ h }) => h || "auto"};
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  color: #212529;
  overflow-y: auto;
  position: relative;
  max-height: 85vh;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f3f4;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 3px;

    &:hover {
      background: #764ba2;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    max-height: 80vh;
    padding: 2rem 1.5rem;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal = ({ isOpen, width, height, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalCard
        className={className}
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
