import React from "react";
import styled from "styled-components";

const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#f093fb",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const CategoriesWrap = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 24px;
`;

const CategoryButton = styled.button`
  padding: 14px 28px;
  border: 2px solid transparent;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  color: #495057;
  border-color: #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-2px);
    background: ${colors.gradient};
    color: white;
    border-color: transparent;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Categories = ({ items, onSelect }) => {
  return (
    <CategoriesWrap>
      {items.map((el, index) => (
        <CategoryButton onClick={() => onSelect(el.name)} key={index}>
          {el.text}
        </CategoryButton>
      ))}
    </CategoriesWrap>
  );
};

export default Categories;
