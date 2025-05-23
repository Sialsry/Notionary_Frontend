import React from 'react';
import styled from 'styled-components';
import PostForm from '../Organisms/PostForm';

const Container = styled.div`
  padding: 40px;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 24px;
`;

const PostTemplate = () => (
  <Container>
    <PageTitle>질문 작성</PageTitle>
    <PostForm />
  </Container>
);

export default PostTemplate;
