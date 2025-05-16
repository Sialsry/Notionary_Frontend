import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin: 8px 0;
  border: 1px solid ${(props) => (props.hasError ? "#ff3860" : "#e0e0e0")};
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ff3860" : "#7E57C2")};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.hasError ? "rgba(255, 56, 96, 0.2)" : "rgba(126, 87, 194, 0.2)"};
  }
`;

const ErrorMessage = styled.div`
  color: #ff3860;
  font-size: 14px;
  margin-top: 5px;
`;

const Input = ({ error, ...props }) => {
  return (
    <>
      <StyledInput hasError={!!error} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default Input;
