import React from 'react';
import styled from 'styled-components';
import Button from '../Atoms/Button';

const CategoriesWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
`;

const Categories = ({ items }) => {
  return (
    <CategoriesWrap>
      {items.map((el, index) => (
        <Button key={index}>{el}</Button>
      ))}
    </CategoriesWrap>
  );
};

export default Categories;
