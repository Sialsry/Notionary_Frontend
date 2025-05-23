import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubCategoryPost } from '../../API/PostApi';
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
      const flattenedPosts = data.data.flatMap(item =>
        item.Posts.map(post => ({
          ...post,
          subCategory: item.SubCategory?.category_name || '',
          mainCategory: item.category_name || ''
        }))
      );
      setPosts(flattenedPosts);
    },
    onError: (data) => {
      console.log(data);
    },
    onMutate: (data) => {
      console.log('디버깅중...', data);
    }
  });

  const categoryList = [
    { name: '전체', text: '전체' },
    { name: 'IT', text: 'IT' },
    { name: '기술스택', text: '기술스택' },
    { name: '디자인', text: '디자인' },
    { name: '여행', text: '여행' },
    { name: '기타', text: '기타' }
  ];

  const subCategories = {
    IT: ['앱 개발', '웹 개발', '개발PM', '블록체인 개발', '데이터분석가', '데이터 엔지니어', '웹 마스터', '백엔드/서버개발', '프론트엔드', '보안 컨설팅'],
    기술스택: ['C언어', 'C++', 'C#', 'java', 'javascript', 'jQuery', 'Node.js', 'MySQL', 'React', 'HTML', 'CSS', 'Python', 'PHP', 'React-Native', 'Redux'],
    디자인: ['가구디자인', '그래픽 디자인', '건축디자인', '광고디자인', '게임디자인', '공간디자인', '공공디자인', '공예디자인', '로고 디자인', '모바일 디자인'],
    여행: ['국내여행', '해외여행', '맛집 탐방', '액티비티 여행', '호캉스', '캠핑', '차박', '역사 탐방', '문화 체험', '자연 경관 여행'],
    기타: ['자유 주제', 'Q&A']
  };

  const handleCategorySelect = (category) => {
    setSelect(category);
    setSelectSubCategory([]);
    if (category !== '전체') {
      OpenModal();
    } else {
      ClosedModal();
      setPosts([]);
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
              console.log('mutation payload:', {
                category_name: select,
                SubCategory: selectSubCategory
              });
              mutation.mutate({
                category_name: select,
                SubCategory: selectSubCategory
              });
              ClosedModal();
            }}
          >
            완료
          </Button>

          {mutation.isLoading && (
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
