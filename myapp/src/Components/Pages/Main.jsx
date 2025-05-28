import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubCategoryPost , AllCategoryPost} from '../../API/PostApi';
import Sidebar from '../Templates/Sidebar';
import styled from 'styled-components';
import Categories from '../Molecules/susu/Categories';
import useModal from '../../Hooks/useModal';
import Modal from '../Molecules/susu/Modal';
import Text from '../Atoms/susu/Text';
import Button from '../Atoms/susu/Button';
import PostList from '../Templates/PostList';
import Header from '../Templates/Header';
import MainText from '../Atoms/susu/MainText';

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: max-content;
  background-color: #fff;
`;

const CategoryTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubCategory = styled.div`
  display: flex;
  padding: 2px 0px;
  font-size: 12px;
  color: #666;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  align-content: center;
  margin-top: 15px;
`;

const SubCategoryButton = styled.div`
  padding: 20px 35px;
  font-size: 16px;
  min-width: 150px;
  text-align: center;
  border-radius: 6px;
  background-color: ${({ selected }) => (selected ? '#a11111' : '#fff')};
  color: ${({ selected }) => (selected ? '#fff' : '#666')};
  border: 1px solid ${({ selected }) => (selected ? '#007BFF' : '#ccc')};
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const CategoryWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #504d4d;
  padding-bottom: 10px;
  margin-bottom: 38px;
`;

const ClosedWrap = styled.div`
  position: absolute;
  top: 16px;
  right: 20px;
  z-index: 1;
`;

const CompleteWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const ChoiceWrap = styled.div`
  display: flex;
  gap: 12px;
`;

const PostWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = () => {
  const { isOpen, isVisible, OpenModal, ClosedModal } = useModal();
  const [select, setSelect] = useState('전체');
  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showMainText, setShowMainText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainText(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const mutation = useMutation({
    mutationFn: SubCategoryPost,
    onSuccess: (data) => {
      setPosts(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const allCategoryMutation = useMutation({
    mutationFn: AllCategoryPost,
    onSuccess: (data) => {
      setPosts(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const categoryList = [
    { name: '전체', text: '전체' },
    { name: 'IT', text: 'IT' },
    { name: '디자인', text: '디자인' },
    { name: '교육', text: '교육' },
    { name: '금융', text: '금융' },
    { name: '취미', text: '취미' },
    { name: '기타', text: '기타' }
  ];

  const subCategories = {
    IT: ['프로그래밍', '인공지능', '클라우드', '사물인터넷', '게임', '네트워크', '보안', '기타'],
    디자인 : ['UI/UX', '그래픽 디자인', '건축디자인', '공간디자인', '기타'],
    교육 : ['예체능', '공학', '의학', '법학', '인문학', '사회과학', '자연과학', '기타'],
    금융 : ['주식투자', '가상화폐', '부동산', '재테크', '기타'],
    취미 : ['여행', '스포츠/액티비티', '예술/공예', '독서/글쓰기', '요리/음식', '음악', '게임', '자연/힐링'],
  };

  const handleCategorySelect = (category) => {
    setSelect(category);
    setSelectSubCategory([]);
    if (category === '전체' || category === '기타') {
      ClosedModal();
      setPosts([]);
      allCategoryMutation.mutate({ category_name: category });
    } else {
      OpenModal();
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectSubCategory(prev =>
      prev.includes(subCategory)
        ? prev.filter(item => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  const SingleSelectCategory = () => {
    setSelectSubCategory([]);
  };

  const isAllSelected = () => {
    return subCategories[select]?.length === selectSubCategory.length;
  };

  return (
    <>
      {!showMainText && <Header />}
      {!showMainText && <Sidebar />}

      {showMainText ? (
        <div className="fade-in">
          <MainText />
        </div>
      ) : (
        <MainWrap>
          <Categories items={categoryList} onSelect={handleCategorySelect} />
          {!isVisible && (
            <PostWrap>
              <PostList posts={posts} />
            </PostWrap>
          )}
        </MainWrap>
      )}

      <Modal width="700px" height="auto" isOpen={isOpen} closeModal={ClosedModal}>
        <Text fontSize="15px">{select}</Text>

        <ChoiceWrap>
          <Button
            onClick={() => {
              if (isAllSelected()) {
                setSelectSubCategory([]);
              } else {
                setSelectSubCategory(subCategories[select]);
              }
            }}
          >
            {isAllSelected() ? '전체 해제' : '전체 선택'}
          </Button>
          <Button onClick={SingleSelectCategory}>선택 초기화</Button>
        </ChoiceWrap>

        {select && subCategories[select] && (
          <>
            <CategoryTitle>
              <Text fontSize="16px">{select}</Text>
            </CategoryTitle>

            <SubCategory>
              {subCategories[select].map((item, idx) => (
                <SubCategoryButton
                  key={idx}
                  selected={selectSubCategory.includes(item)}
                  onClick={() => handleSubCategorySelect(item)}
                >
                  {item}
                </SubCategoryButton>
              ))}
            </SubCategory>
          </>
        )}

        <ClosedWrap>
          <Button onClick={ClosedModal}>닫기</Button>
        </ClosedWrap>

        <CategoryWrapper />

        {selectSubCategory.length > 0 && (
          <Text fontSize="14px" style={{ marginTop: '20px' }}>
            선택된 상세 카테고리: {selectSubCategory.join(', ')}
          </Text>
        )}

        <CompleteWrap>
          <Button
            disabled={mutation.isLoading}
            onClick={() => {
              mutation.mutate({
                category_name: select,
                SubCategory: selectSubCategory
              });
              ClosedModal();
            }}
          >
            조회
          </Button>

          {(mutation.isLoading || allCategoryMutation.isLoading) && (
            <Text fontSize="14px" style={{ marginTop: '10px', color: 'gray' }}>
              불러오는 중...
            </Text>
          )}
        </CompleteWrap>
      </Modal>
    </>
  );
};

export default Main;
