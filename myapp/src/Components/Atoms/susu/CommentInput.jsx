import React from 'react';
import styled from 'styled-components';
import Input from '../../Atoms/susu/Input';


const InputWrapper = styled.div`
  margin-top: 8px;
  border: none;
  border-radius: 20px;
  padding: 0 12px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  background: #fafafa;

  &:focus-within {
    border: none;
    outline: none;
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  padding: 0 8px;

  &::placeholder {
    color: #999;
  }
`;

function CommentInput({ value, onChange, onSubmit, uid, post_id, category_id }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault();
      onSubmit({ uid, post_id, category_id, content: value });
    }
  };

  return (
    <InputWrapper>
      <StyledInput
        placeholder="댓글을 입력해주세요..."
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </InputWrapper>
  );
}

export default CommentInput;
