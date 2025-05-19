import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => (props.secondary ? "#fff" : "#7E57C2")};
  color: ${(props) => (props.secondary ? "#7E57C2" : "#fff")};
  border: ${(props) => (props.secondary ? "2px solid #7E57C2" : "none")};
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => (props.secondary ? "#f5f0ff" : "#5E35B1")};
  }

  &:disabled {
    background-color: #d0d0d0;
    color: #808080;
    cursor: not-allowed;
  }
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
