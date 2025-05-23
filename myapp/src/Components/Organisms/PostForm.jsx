import React from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import TitleInput from '../Molecules/susu/TitleInput';
import MediaUpload from '../Molecules/susu/MideaUpload';
import CategorySelect from '../Molecules/susu/CategorySelect';
import ContentEdit from '../Molecules/susu/ContentEdit';
import Button from '../Atoms/susu/Button';

const Form = styled.form`
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;

const QuestionForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  };

  const handleCancel = () => {
    navigate('/main');
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <TitleInput />
      <MediaUpload/>
      <CategorySelect />
      <ContentEdit />
      <ButtonGroup>
        <Button onClick={handleCancel} type="button">취소</Button>
        <Button type="submit">질문 등록</Button>
      </ButtonGroup>
    </Form>
  );
};

export default QuestionForm;
