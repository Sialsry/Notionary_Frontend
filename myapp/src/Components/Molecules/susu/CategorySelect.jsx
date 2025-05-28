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
      { id: 6, name: '프로그래밍' },
      { id: 7, name: '인공지능' },
      { id: 8, name: '클라우드' },
      { id: 9, name: '사물인터넷' },
      { id: 10, name: '게임' },
      { id: 11, name: '네트워크'},
      { id: 12, name: '보안' },
      { id: 13, name: '기타' },
    ],
  },

  디자인: {
    id: 2,
    subs: [
      { id: 16, name: 'UI/UX' },
      { id: 17, name: '그래픽디자인' },
      { id: 18, name: '건축디자인' },
      { id: 19, name: '공간디자인' },
      { id: 20, name: '기타' },
    ],
  },

  교육: {
    id: 3,
    subs: [
      { id: 31, name: '예체능' },
      { id: 32, name: '공학' },
      { id: 33, name: '의학' },
      { id: 34, name: '법학' },
      { id: 35, name: '인문학' },
      { id: 36, name: '사회과학' },
      { id: 37, name: '자연과학' },
      { id: 38, name: '기타' },
    ],
  },

  금융: {
    id: 4,
    subs: [
      { id: 41, name: '주식투자' },
      { id: 42, name: '가상화폐' },
      { id: 43, name: '부동산' },
      { id: 44, name: '재테크' },
      { id: 45, name: '기타' },
    ],
  },

  취미 : {
    id: 5,
    subs: [
      { id: 51, name: '여행' },
      { id: 52, name: '스포츠/액티비티' },
      { id: 53, name: '예술/공예' },
      { id: 54, name: '독서/글쓰기' },
      { id: 55, name: '요리/음식' },
      { id: 56, name: '음악' },
      { id: 57, name: '게임' },
      { id: 58, name: '자연/힐링' },
    ],
  },
  
  기타 : {
    id : 6,
    subs : []
  }
};


   const handleMainCategorySelect = (category) => {
    setMainCategory(category);
    setSubCategories([]);
    setShowDropdown(false);
    onCategoryChange?.(category, [], categoryMap[category].id);
  };

 const toggleSubCategory = (sub) => {
  const alreadySelected = subCategories.includes(sub.id);
  const updated = alreadySelected ? [] : [sub.id];

  setSubCategories(updated);
  onCategoryChange?.(mainCategory, updated, updated[0] || null);
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
          <Text style={{ marginTop: '12px' }}>세부 카테고리 선택</Text>
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