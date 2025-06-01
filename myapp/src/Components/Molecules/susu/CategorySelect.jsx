import React, { useState, useEffect } from "react"; // useEffect 추가
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

const CategorySelector = ({
  mainCategory, // PostForm에서 받아온 mainCategory 상태
  setMainCategory, // PostForm의 setMainCategory 함수
  subCategories, // PostForm에서 받아온 subCategories 상태 (배열)
  setSubCategories, // PostForm의 setSubCategories 함수
  categoryId, // PostForm에서 받아온 categoryId 상태 (Post API의 category_id)
  setCategoryId, // PostForm의 setCategoryId 함수
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // categoryId prop이 변경될 때 (즉, 게시글 데이터를 불러왔을 때)
  // 해당 categoryId에 맞는 메인/서브 카테고리를 찾아 부모의 상태를 업데이트합니다.
  useEffect(() => {
    if (categoryId) { // categoryId가 유효한 경우에만 실행
      let foundMainCategoryName = "";
      let foundSubCategoryIds = [];

      for (const mainCatKey in categoryMap) {
        const mainCatValue = categoryMap[mainCatKey];

        // 1. categoryId가 메인 카테고리 ID인 경우 (예: '기타'의 ID 6)
        if (mainCatValue.id === categoryId) {
          foundMainCategoryName = mainCatKey;
          foundSubCategoryIds = []; // 메인 카테고리인 경우 서브 카테고리는 없음
          break;
        }

        // 2. categoryId가 서브 카테고리 ID인 경우
        const foundSub = mainCatValue.subs.find(
          (sub) => sub.id === categoryId
        );
        if (foundSub) {
          foundMainCategoryName = mainCatKey;
          foundSubCategoryIds = [foundSub.id]; // 서브 카테고리는 단일 선택으로 가정
          break;
        }
      }

      // 부모의 mainCategory 상태 업데이트 (현재 값과 다를 경우에만)
      if (foundMainCategoryName && foundMainCategoryName !== mainCategory) {
        setMainCategory(foundMainCategoryName);
      }
      
      // 부모의 subCategories 상태 업데이트 (현재 값과 다를 경우에만)
      // 배열 비교를 위해 JSON.stringify 사용
      if (JSON.stringify(foundSubCategoryIds) !== JSON.stringify(subCategories)) {
        setSubCategories(foundSubCategoryIds);
      }
      
      // 부모의 categoryId 상태는 이미 PostForm에서 설정되었으므로 여기서는 건드리지 않습니다.
      // (단, CategorySelector가 categoryId를 직접 설정해야 하는 로직이라면 필요할 수 있습니다.)

    } else {
      // categoryId가 없거나 (새 게시글 작성 모드) 유효하지 않을 경우
      // 부모의 상태를 초기화
      setMainCategory("");
      setSubCategories([]);
      // setCategoryId(""); // PostForm에서 이미 초기화하므로 여기서는 필요 없을 수 있습니다.
    }
  }, [categoryId, setMainCategory, setSubCategories]); // 의존성 배열에 관련 prop들 포함

  const handleMainCategorySelect = (category) => {
    const mainCatId = categoryMap[category].id;
    setMainCategory(category); // 부모의 mainCategory 상태 업데이트
    setSubCategories([]); // 메인 카테고리 변경 시 서브 카테고리 초기화
    setCategoryId(mainCatId); // 부모의 categoryId 상태 업데이트
    setShowDropdown(false);
  };

  const toggleSubCategory = (sub) => {
    const updated = [sub.id]; // 현재는 서브 카테고리 단일 선택으로 가정
    setSubCategories(updated); // 부모의 subCategories 상태 업데이트
    setCategoryId(updated[0]); // 부모의 categoryId 상태 업데이트 (서브 카테고리 ID로)
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
          {mainCategory || "카테고리를 선택하세요"} {/* 부모의 mainCategory prop 사용 */}
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

      {/* 메인 카테고리가 선택되었고, 해당 메인 카테고리에 서브 카테고리가 있을 경우에만 표시 */}
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