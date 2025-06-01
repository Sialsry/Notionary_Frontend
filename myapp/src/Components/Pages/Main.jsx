import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  SubCategoryPost,
  AllCategoryPost,
  EtcCategoryPost,
} from "../../API/PostApi";
import Sidebar from "../Templates/Sidebar";
import styled from "styled-components";
import Categories from "../Molecules/susu/Categories";
import useModal from "../../Hooks/useModal";
import Modal from "../Molecules/susu/Modal";
import Text from "../Atoms/susu/Text";
import Button from "../Atoms/susu/Button";
import PostList from "../Templates/PostList";
import Header from "../Templates/Header";
import MainText from "../Atoms/susu/MainText";

// 컬러 팔레트
const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#f093fb",
  success: "#4ecdc4",
  warning: "#ffe066",
  info: "#74b9ff",
  danger: "#fd79a8",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gradientAccent: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  gradientSuccess: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
  gradientInfo: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
};

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
<<<<<<< HEAD
  width: 80%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-top: 75px; /* 헤더 높이만큼 여백 */
  padding-left: 300px; /* 사이드바 너비만큼 여백 */

  @media (max-width: 768px) {
    padding-left: 0;
  }
=======
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
>>>>>>> susu
`;
const CategoryTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #212529;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 20px;
`;

const SubCategory = styled.div`
  display: flex;
  padding: 2px 0px;
  font-size: 14px;
  color: #495057;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  align-content: center;
  margin-top: 20px;
`;

const SubCategoryButton = styled.div`
  padding: 12px 24px;
  font-size: 14px;
  min-width: 120px;
  text-align: center;
  border-radius: 12px;
  background: ${({ selected }) => (selected ? colors.gradient : "white")};
  color: ${({ selected }) => (selected ? "#fff" : "#495057")};
  border: 2px solid ${({ selected }) => (selected ? "transparent" : "#e9ecef")};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${({ selected }) => (selected ? "600" : "500")};
  box-shadow: ${({ selected }) =>
    selected
      ? "0 4px 15px rgba(102, 126, 234, 0.3)"
      : "0 2px 8px rgba(0, 0, 0, 0.06)"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ selected }) =>
      selected
        ? "0 6px 20px rgba(102, 126, 234, 0.4)"
        : "0 4px 12px rgba(0, 0, 0, 0.1)"};
    ${({ selected }) =>
      !selected &&
      `
      background: #f8f9fa;
      border-color: ${colors.primary};
    `}
  }
`;

const CategoryWrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid #f1f3f4;
  padding-bottom: 16px;
  margin-bottom: 32px;
`;

const ClosedWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 24px;
  z-index: 1;
`;

const CompleteWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 2rem;
`;

const ChoiceWrap = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
`;

const PostWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #212529;
    margin: 0;
  }
`;

const SelectedCategories = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-top: 24px;
  border-left: 4px solid ${colors.primary};

  .label {
    font-size: 12px;
    color: #6c757d;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .value {
    font-size: 14px;
    color: #212529;
    font-weight: 500;
  }
`;

const LoadingText = styled.div`
  text-align: center;
  color: #6c757d;
  font-size: 14px;
  margin-top: 16px;
  font-weight: 500;
`;

const Main = () => {
  const queryClient = useQueryClient();
  const { isOpen, isVisible, OpenModal, ClosedModal } = useModal();

  const [select, setSelect] = useState("전체");
  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const [showMainText, setShowMainText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowMainText(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", select, selectSubCategory],
    queryFn: () => {
      if (select === "전체") return AllCategoryPost({ offset: 0, limit: 1000 });
      if (select === "기타") return EtcCategoryPost({ offset: 0, limit: 1000 });
      if (selectSubCategory.length > 0)
        return SubCategoryPost({
          category_name: select,
          SubCategory: selectSubCategory,
        });
      return Promise.resolve({ data: [] });
    },
    enabled: !showMainText,
    keepPreviousData: true,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (showMainText) return;

    const intervalId = setInterval(() => {
      queryClient.invalidateQueries(["posts", select, selectSubCategory]);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [queryClient, select, selectSubCategory, showMainText]);

  const categoryList = [
    { name: "전체", text: "전체" },
    { name: "IT", text: "IT" },
    { name: "디자인", text: "디자인" },
    { name: "교육", text: "교육" },
    { name: "금융", text: "금융" },
    { name: "취미", text: "취미" },
    { name: "기타", text: "기타" },
  ];

  const subCategories = {
    IT: [
      "프로그래밍",
      "인공지능",
      "클라우드",
      "사물인터넷",
      "게임",
      "네트워크",
      "보안",
      "기타",
    ],
    디자인: ["UI/UX", "그래픽 디자인", "건축디자인", "공간디자인", "기타"],
    교육: [
      "예체능",
      "공학",
      "의학",
      "법학",
      "인문학",
      "사회과학",
      "자연과학",
      "기타",
    ],
    금융: ["주식투자", "가상화폐", "부동산", "재테크", "기타"],
    취미: [
      "여행",
      "스포츠/액티비티",
      "예술/공예",
      "독서/글쓰기",
      "요리/음식",
      "음악",
      "게임",
      "자연/힐링",
    ],
  };

  const handleCategorySelect = (category) => {
    setSelect(category);
    setSelectSubCategory([]);

    if (category === "전체" || category === "기타") {
      ClosedModal();
    } else {
      OpenModal();
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectSubCategory((prev) =>
      prev.includes(subCategory)
        ? prev.filter((item) => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  const SingleSelectCategory = () => setSelectSubCategory([]);

  const isAllSelected = () =>
    subCategories[select]?.length === selectSubCategory.length;

  return (
    <>
      {showMainText ? (
        <div className="fade-in">
          <MainText />
        </div>
      ) : (
        <MainWrap>
          <Categories items={categoryList} onSelect={handleCategorySelect} />
          {!isVisible && (
            <PostWrap>
              <PostList
                posts={data?.data || []}
                isLoading={isLoading}
                isError={isError}
              />
            </PostWrap>
          )}
        </MainWrap>
      )}

      <StyledModal
        width="700px"
        height="auto"
        isOpen={isOpen}
        closeModal={ClosedModal}
      >
        <ModalHeader>
          <h2>{select} 카테고리</h2>
        </ModalHeader>

        <ChoiceWrap>
          <Button
            variant="primary"
            onClick={() => {
              if (isAllSelected()) {
                setSelectSubCategory([]);
              } else {
                setSelectSubCategory(subCategories[select]);
              }
            }}
          >
            {isAllSelected() ? "전체 해제" : "전체 선택"}
          </Button>
          <Button variant="secondary" onClick={SingleSelectCategory}>
            선택 초기화
          </Button>
        </ChoiceWrap>

        {select && subCategories[select] && (
          <>
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
          <Button variant="secondary" onClick={ClosedModal}>
            닫기
          </Button>
        </ClosedWrap>

        <CategoryWrapper />

        {selectSubCategory.length > 0 && (
          <SelectedCategories>
            <div className="label">선택된 카테고리</div>
            <div className="value">{selectSubCategory.join(", ")}</div>
          </SelectedCategories>
        )}

        <CompleteWrap>
          <Button
            variant="primary"
            onClick={() => {
              ClosedModal();
              queryClient.invalidateQueries([
                "posts",
                select,
                selectSubCategory,
              ]);
            }}
            disabled={isLoading}
          >
            조회하기
          </Button>

          {isLoading && <LoadingText>불러오는 중...</LoadingText>}
        </CompleteWrap>
      </StyledModal>
    </>
  );
};

export default Main;
