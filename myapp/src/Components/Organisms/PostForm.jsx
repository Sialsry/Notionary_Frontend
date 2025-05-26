import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {useMutation} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import TitleInput from '../Molecules/susu/TitleInput';
import MediaUpload from '../Molecules/susu/MideaUpload';
import CategorySelect from '../Molecules/susu/CategorySelect';
import ContentEdit from '../Molecules/susu/ContentEdit';
import Button from '../Atoms/susu/Button';
import { CreatePost } from '../../API/PostApi';

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
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);
  const uid = userInfo?.uid;
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);

  const { mutate } = useMutation({
    mutationFn : CreatePost,
    onSuccess : (data) => {
      console.log(data);
    },
    onError : (data) => {
      console.log(data)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('mainCategory', mainCategory);
    formData.append('subCategories', subCategories.join(','));
    formData.append('uid', uid);
    formData.append('category_id', categoryId);
    formData.append('title', title);
    formData.append('content', content);
    mutate(formData);
  };

  const handleCancel = () => {
    navigate('/main');
  };

  const isFormValid = mainCategory && subCategories.length > 0;

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <MediaUpload />
      <CategorySelect onCategoryChange={(main, subs) => {
        setMainCategory(main);
        setSubCategories(subs);
      }} />
      <ContentEdit value={content} onChange={(e) => setContent(e.target.value)} />
      <ButtonGroup>
        <Button onClick={handleCancel} type="button">취소</Button>
        <Button type="submit" disabled={!isFormValid}>
          질문 등록
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default QuestionForm;
