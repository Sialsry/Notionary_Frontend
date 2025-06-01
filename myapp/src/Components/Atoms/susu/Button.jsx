import React from "react";
import styled from "styled-components";

const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#f093fb",
  success: "#4ecdc4",
  warning: "#ffe066",
  info: "#74b9ff",
  danger: "#fd79a8",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gradientAccent: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  gradientSuccess: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
  gradientInfo: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
  gradientWarning: "linear-gradient(135deg, #fde47f 0%, #f9d423 100%)",
};

const ButtonWrap = styled.button`
  min-width: ${({ size }) => (size === "small" ? "80px" : "100px")};
  height: ${({ size }) => (size === "small" ? "36px" : "44px")};
  padding: ${({ padding, size }) =>
    padding || (size === "small" ? "8px 16px" : "10px 24px")};
  margin-top: ${({ noMargin }) => (noMargin ? "0" : "20px")};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: ${({ size }) => (size === "small" ? "13px" : "14px")};
  gap: 6px;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background: ${colors.gradient};
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          }
        `;
      case "secondary":
        return `
          background: #f8f9fa;
          color: #495057;
          border: 1px solid #dee2e6;
          &:hover {
            background: #e9ecef;
            border-color: ${colors.primary};
          }
        `;
      case "accent":
        return `
          background: ${colors.gradientAccent};
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);
          }
        `;
      case "success":
        return `
          background: ${colors.gradientSuccess};
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
          }
        `;
      case "info":
        return `
          background: ${colors.gradientInfo};
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(116, 185, 255, 0.3);
          }
        `;
      case "warning":
        return `
          background: ${colors.gradientWarning};
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(255, 224, 102, 0.3);
          }
        `;
      default:
        return `
          background: ${colors.primary};
          color: white;
          &:hover {
            background: ${colors.secondary};
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(118, 75, 162, 0.3);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const Button = ({
  padding,
  backgroundColor,
  children,
  onClick,
  variant,
  size,
  noMargin,
  ...props
}) => {
  return (
    <ButtonWrap
      padding={padding}
      backgroundColor={backgroundColor}
      onClick={onClick}
      variant={variant}
      size={size}
      noMargin={noMargin}
      {...props}
    >
      {children}
    </ButtonWrap>
  );
};

export default Button;
