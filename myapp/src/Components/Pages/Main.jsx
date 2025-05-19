import React, { useState } from 'react'
import Sidebar from '../Templates/Sidebar'
import styled from 'styled-components'
import Categories from '../Molecules/Categories'
import useModal from '../../Hooks/useModal'
import Modal from '../Molecules/Modal'
import Text from '../Atoms/Text'
import Button from '../Atoms/Button'
import PostCard from '../Molecules/PostCard'
import PostList from '../Templates/PostList'

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: max-content;
  background-color: #fff;
`

const CategoryTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

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
`

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
`

const CategoryWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #504d4d;
  padding-bottom: 10px;
  margin-bottom: 38px;
`

const CompleteWrap = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
`

const ClosedWrap  = styled.div`
  position: absolute;
  top: -10px;
  right: 10px;
`
const ChoiceWrap = styled.div`
  display: flex;
  gap : 12px;
`

const PostWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Main = () => {
  const { isOpen, isVisible, OpenModal, ClosedModal } = useModal();
  const [select, setSelect] = useState('전체');
  const [selectSubCategory, setSelectSubCategory] = useState([]);

  const categoryList = [
    { name: '전체', text: "전체" },
    { name: 'IT', text: 'IT' },
    { name: '기술스택', text: '기술스택' },
    { name: '디자인', text: '디자인' },
    { name: '여행', text: '여행' },
    { name: '기타', text: '기타' }
  ];

  const subCategories = {
    'IT': ['앱 개발', '웹 개발', '개발PM', '블록체인 개발', '데이터분석가', '데이터 엔지니어', '웹 마스터', '백엔드/서버개발', '프론트엔드','보안 컨설팅'],
    '기술스택': ['C언어', 'C++', 'C#', 'java', 'javascript', 'jQuery', 'Node.js', 'MySQL', 'React', 'HTML','CSS', 'Python', 'PHP', 'React-Native','Redux'],
    '디자인': ['가구디자인', '그래픽 디자인', '건축디자인', '광고디자인', '게임디자인', '공간디자인', '공공디자인', '공예디자인','로고 디자인','모바일 디자인'],
    '여행': ['국내여행', '해외여행', '맛집 탐방', '액티비티 여행', '호캉스', '캠핑', '차박', '역사 탐방', '문화 체험', '자연 경관 여행'],
    '기타': ['자유 주제', 'Q&A']
  };

  const handleCategorySelect = (category) => {
    setSelect(category);
    setSelectSubCategory([]);
    if (category !== '전체') {
      OpenModal();
    } else {
      ClosedModal();
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectSubCategory((prev) => {
      if (prev.includes(subCategory)) {
        return prev.filter(item => item !== subCategory);
      } else {
        return [...prev, subCategory];
      }
    });
  };

  const AllSelectCategory = () => {
    if (select && subCategories[select]) {
      setSelectSubCategory(subCategories[select]);
    }
  };

  const SingleSelectCategory = () => {
    setSelectSubCategory([]);
  };


 return (
  <>
    <Sidebar />
    <Modal width={'700px'} height={"auto"} isOpen={isOpen} closeModal={ClosedModal}>
      <Text fontSize={"15px"}>{select}</Text>

      <ChoiceWrap>
        <Button onClick={AllSelectCategory}>전체 선택</Button>
        <Button onClick={SingleSelectCategory}>선택 및 해제</Button>
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
        <Button>완료</Button>
      </CompleteWrap>
    </Modal>


    <MainWrap>
      <Categories items={categoryList} onSelect={handleCategorySelect} />

     {!isVisible && (
    <PostWrap>
      <PostList />
    </PostWrap>
    )}
    </MainWrap>
  </>
  );
};

export default Main;
