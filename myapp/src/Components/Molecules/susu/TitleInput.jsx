import React from 'react';
import Text from '../../Atoms/susu/Text';
import Input from '../../Atoms/susu/Input';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const TitleInput = () => (
  <Wrapper>
    <Text>제목</Text>
    <Input  width={"200px"}name="title" placeholder="질문 제목을 입력하세요" />
  </Wrapper>
);

export default TitleInput;
