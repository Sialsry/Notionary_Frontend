import React, { useState } from "react";
import styled from "styled-components";
import { Tag, ChevronDown } from "lucide-react";

const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#f093fb",
  success: "#4ecdc4",
  warning: "#ffe066",
  info: "#74b9ff",
  danger: "#fd79a8",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gradientInfo: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
};

const Wrapper = styled.div`
  margin-bottom: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 12px;
`;

const DropdownContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 16px;
  text-align: left;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  list-style: none;
  padding: 8px 0;
  margin: 4px 0 0 0;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%);
    color: ${colors.primary};
  }
`;

const SubCategorySection = styled.div`
  margin-top: 20px;
`;

const SubLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 12px;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.div`
  padding: 10px 16px;
  background: ${({ selected }) => (selected ? colors.gradientInfo : "#f8f9fa")};
  color: ${({ selected }) => (selected ? "white" : "#495057")};
  border: 2px solid ${({ selected }) => (selected ? "transparent" : "#e9ecef")};
  border-radius: 25px;
  cursor: pointer;
  user-select: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${colors.primary};
  }
`;

// 카테고리 맵은 기존과 동일...
const categoryMap = {
  IT: {
    id: 1,
    subs: [
      { id: 7, name: "프로그래밍" },
      { id: 8, name: "인공지능" },
      { id: 9, name: "클라우드" },
      { id: 10, name: "사물인터넷" },
      { id: 11, name: "게임" },
      { id: 12, name: "네트워크" },
      { id: 13, name: "보안" },
      { id: 14, name: "기타" },
    ],
  },
  디자인: {
    id: 2,
    subs: [
      { id: 15, name: "UI/UX" },
      { id: 16, name: "그래픽디자인" },
      { id: 17, name: "건축디자인" },
      { id: 18, name: "공간디자인" },
      { id: 19, name: "기타" },
    ],
  },
  교육: {
    id: 3,
    subs: [
      { id: 20, name: "예체능" },
      { id: 21, name: "공학" },
      { id: 22, name: "의학" },
      { id: 23, name: "법학" },
      { id: 24, name: "인문학" },
      { id: 25, name: "사회과학" },
      { id: 26, name: "자연과학" },
      { id: 27, name: "기타" },
    ],
  },
  금융: {
    id: 4,
    subs: [
      { id: 28, name: "주식투자" },
      { id: 29, name: "가상화폐" },
      { id: 30, name: "부동산" },
      { id: 31, name: "재테크" },
      { id: 32, name: "기타" },
    ],
  },
  취미: {
    id: 5,
    subs: [
      { id: 33, name: "여행" },
      { id: 34, name: "스포츠/액티비티" },
      { id: 35, name: "예술/공예" },
      { id: 36, name: "독서/글쓰기" },
      { id: 37, name: "요리/음식" },
      { id: 38, name: "음악" },
      { id: 39, name: "게임" },
      { id: 40, name: "자연/힐링" },
    ],
  },
  기타: {
    id: 6,
    subs: [],
  },
};

const CategorySelector = ({ onCategoryChange }) => {
  const [mainCategory, setMainCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

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
      <Label>
        <Tag size={18} color={colors.primary} />
        카테고리
      </Label>

      <DropdownContainer>
        <DropdownButton
          type="button"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {mainCategory || "카테고리를 선택하세요"}
          <ChevronDown size={16} />
        </DropdownButton>

        {showDropdown && (
          <DropdownList>
            {Object.keys(categoryMap).map((category) => (
              <DropdownItem
                key={category}
                onClick={() => handleMainCategorySelect(category)}
              >
                {category}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>

      {mainCategory && categoryMap[mainCategory]?.subs.length > 0 && (
        <SubCategorySection>
          <SubLabel>세부 카테고리 선택</SubLabel>
          <ChipContainer>
            {categoryMap[mainCategory].subs.map((sub) => (
              <Chip
                key={sub.id}
                selected={subCategories.includes(sub.id)}
                onClick={() => toggleSubCategory(sub)}
              >
                {sub.name}
              </Chip>
            ))}
          </ChipContainer>
        </SubCategorySection>
      )}
    </Wrapper>
  );
};

export default CategorySelector;
