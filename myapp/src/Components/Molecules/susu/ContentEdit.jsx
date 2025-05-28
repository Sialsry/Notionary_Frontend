import React from 'react';
import Label from '../../Atoms/susu/Text';
import Textarea from '../../Atoms/susu/Textarea';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const ContentEdit = ({value, onChange}) => (
  <Wrapper>
    <Label>내용</Label>
    <Textarea fontWeight={"bold"} name="content" value={value} onChange={onChange} rows="5" placeholder="질문 내용을 입력하세요" />
  </Wrapper>
);

export default ContentEdit;
