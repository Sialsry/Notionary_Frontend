import React from "react";
import styled from "styled-components";
import { MessageSquare } from "lucide-react";

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

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #6c757d;
  margin-top: 8px;
`;

const ContentEdit = ({ value, onChange }) => (
  <Wrapper>
    <Label>
      <MessageSquare size={18} color={colors.primary} />
      내용
    </Label>
    <StyledTextarea
      name="content"
      value={value}
      onChange={onChange}
      placeholder="질문 내용을 자세히 작성해주세요"
      maxLength={1000}
      />
      <CharCount>{value?.length || 0} / 1000</CharCount>
    </Wrapper>
);

export default ContentEdit;
