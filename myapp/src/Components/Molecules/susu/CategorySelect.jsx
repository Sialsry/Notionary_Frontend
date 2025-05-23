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

const CategorySelector = () => {
  const [mainCategory, setMainCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  const categoryMap = {
    IT: ['앱 개발', '웹 개발', '개발PM', '블록체인 개발', '데이터분석가', '데이터 엔지니어', '웹 마스터', '백엔드/서버개발', '프론트엔드', '보안컨설팅'],
    기술스택: ['C언어', 'C++', 'C#', 'java','JavaScript', 'jQuery', 'Node.js', 'React', 'HTML', 'CSS', 'Python', 'PHP', 'React-Native', 'Redux'],
    디자인: ['가구디자인', '그래픽 디자인', '건축디자인', '광고디자인', '게임디자인', '공간디자인', '공공디자인', '공예디자인', '로고 디자인', '모바일 디자인'],
    여행: ['국내여행', '해외여행', '맛집 탐방', '액티비티 여행', '호캉스', '캠핑', '차박', '역사 탐방', '문화 체험', '자연 경관 여행'],
    기타: ['자유 주제', 'Q&A']
  };

  const handleMainCategorySelect = (category) => {
    setMainCategory(category);
    setSubCategories([]);
    setShowDropdown(false);
  };

  const toggleSubCategory = (sub) => {
    setSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((item) => item !== sub) : [...prev, sub]
    );
  };

  const areAllSelected = () =>
    categoryMap[mainCategory]?.every((sub) => subCategories.includes(sub));

  const toggleSelectAll = () => {
    if (areAllSelected()) {
      setSubCategories([]);
    } else {
      setSubCategories(categoryMap[mainCategory]);
    }
  };

  return (
    <Wrapper>
      <Text>카테고리</Text>
      <DropdownButton onClick={() => setShowDropdown((prev) => !prev)}>
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
          <SelectAllButton onClick={toggleSelectAll}>
            {areAllSelected() ? '전체 해제' : '전체 선택'}
          </SelectAllButton>
          <ChipContainer>
            {categoryMap[mainCategory].map((sub) => (
              <Chip
                key={sub}
                selected={subCategories.includes(sub)}
                onClick={() => toggleSubCategory(sub)}
              >
                {sub}
              </Chip>
            ))}
          </ChipContainer>
        </>
      )}
    </Wrapper>
  );
};

export default CategorySelector;
