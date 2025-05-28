import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '../../Atoms/susu/Text';

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const DropdownButton = styled.button`
  padding: 10px;
  width: 100%;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  background: white;
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.div`
  padding: 8px 12px;
  background-color: ${({ selected }) => (selected ? '#e6e6fa' : '#e0e0e0')};
  color: ${({ selected }) => (selected ? '#333' : '#fff')};
  border-radius: 20px;
  cursor: pointer;
  user-select: none;
`;

const SelectAllButton = styled.button`
  margin: 8px 0;
  padding: 6px 12px;
  background-color: #7e57c2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const CategorySelector = ({ onCategoryChange }) => {
  const [mainCategory, setMainCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

const categoryMap = {
  IT: {
    id: 1,
    subs: [
      { id: 6, name: '앱 개발' },
      { id: 7, name: '웹 개발' },
      { id: 8, name: '개발PM' },
      { id: 9, name: '블록체인 개발' },
      { id: 10, name: '데이터분석가' },
      { id: 11, name: '데이터 엔지니어' },
      { id: 12, name: '웹 마스터' },
      { id: 13, name: '백엔드/서버개발' },
      { id: 14, name: '프론트엔드' },
      { id: 15, name: '보안컨설팅' },
    ],
  },

  기술스택: {
    id: 2,
    subs: [
      { id: 16, name: 'C언어' },
      { id: 17, name: 'C++' },
      { id: 18, name: 'C#' },
      { id: 19, name: 'java' },
      { id: 20, name: 'JavaScript' },
      { id: 21, name: 'jQuery' },
      { id: 22, name: 'Node.js' },
      { id: 23, name: 'MySQL' },
      { id: 24, name: 'React' },
      { id: 25, name: 'HTML' },
      { id: 26, name: 'CSS' },
      { id: 27, name: 'Python' },
      { id: 28, name: 'PHP' },
      { id: 29, name: 'React-Native' },
      { id: 30, name: 'Redux' },
    ],
  },

  디자인: {
    id: 3,
    subs: [
      { id: 31, name: '가구디자인' },
      { id: 32, name: '그래픽 디자인' },
      { id: 33, name: '건축디자인' },
      { id: 34, name: '광고디자인' },
      { id: 35, name: '게임디자인' },
      { id: 36, name: '공간디자인' },
      { id: 37, name: '공공 디자인' },
      { id: 38, name: '공예디자인' },
      { id: 39, name: '로고 디자인' },
      { id: 40, name: '모바일 디자인' },
    ],
  },

  여행: {
    id: 4,
    subs: [
      { id: 41, name: '국내여행' },
      { id: 42, name: '해외여행' },
      { id: 43, name: '맛집 탐방' },
      { id: 44, name: '액티비티 여행' },
      { id: 45, name: '호캉스' },
      { id: 46, name: '캠핑' },
      { id: 47, name: '차박' },
      { id: 48, name: '역사 탐방' },
      { id: 49, name: '문화 체험' },
      { id: 50, name: '자연 경관 여행' },
    ],
  },

  기타: {
    id: 5,
    subs: [
      { id: 51, name: '자유 주제' },
      { id: 52, name: 'Q&A' },
    ],
  },
};


   const handleMainCategorySelect = (category) => {
    setMainCategory(category);
    setSubCategories([]);
    setShowDropdown(false);
    onCategoryChange?.(category, [], categoryMap[category].id);
  };

  const toggleSubCategory = (sub) => {
  const updated = subCategories.includes(sub.id)
    ? subCategories.filter((id) => id !== sub.id)
    : [...subCategories, sub.id];

  setSubCategories(updated);
  const firstSubCategoryId = updated.length > 0 ? updated[0] : null;
  onCategoryChange?.(mainCategory, updated, firstSubCategoryId);
};
  const areAllSelected = () =>
    categoryMap[mainCategory]?.subs.every((sub) => subCategories.includes(sub.id));

  const toggleSelectAll = () => {
    const updated = areAllSelected()
      ? []
      : categoryMap[mainCategory]?.subs.map((sub) => sub.id) || [];
    setSubCategories(updated);
    onCategoryChange?.(mainCategory, updated, categoryMap[mainCategory].id);
  };

  return (
    <Wrapper>
      <Text>카테고리</Text>
      <DropdownButton type='button' onClick={() => setShowDropdown((prev) => !prev)}>
        {mainCategory || '카테고리를 선택하세요'}
      </DropdownButton>
      {showDropdown && (
        <DropdownList>
          {Object.keys(categoryMap).map((category) => (
            <DropdownItem key={category} onClick={() => handleMainCategorySelect(category)}>
              {category}
            </DropdownItem>
          ))}
        </DropdownList>
      )}

      {mainCategory && (
        <>
          <Text style={{ marginTop: '12px' }}>세부 카테고리 (복수 선택 가능)</Text>
          <SelectAllButton type='button' onClick={toggleSelectAll}>
            {areAllSelected() ? '전체 해제' : '전체 선택'}
          </SelectAllButton>
          <ChipContainer>
            {categoryMap[mainCategory]?.subs.map((sub) => (
              <Chip
                key={sub.id}
                selected={subCategories.includes(sub.id)}
                onClick={() => toggleSubCategory(sub)}
              >
                {sub.name}
              </Chip>
            ))}
          </ChipContainer>
        </>
      )}
    </Wrapper>
  );
};

export default CategorySelector;