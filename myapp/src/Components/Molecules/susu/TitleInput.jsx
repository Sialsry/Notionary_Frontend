import React from "react";
import styled from "styled-components";
import { Type } from "lucide-react";

const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#f093fb",
  success: "#4ecdc4",
  warning: "#ffe066",
  info: "#74b9ff",
  danger: "#fd79a8",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const Wrapper = styled.div`
  margin-bottom: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 12px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #6c757d;
    font-weight: 400;
  }
`;

const TitleInput = ({ value, onChange }) => {
  return (
    <Wrapper>
      <Label>
        <Type size={18} color={colors.primary} />
        제목
      </Label>
      <StyledInput
        name="title"
        value={value}
        onChange={onChange}
        placeholder="질문 제목을 입력하세요"
        maxLength={100}
      />
    </Wrapper>
  );
};

export default TitleInput;
