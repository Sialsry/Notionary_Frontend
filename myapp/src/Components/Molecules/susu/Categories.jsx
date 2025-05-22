import React from 'react';
import styled from 'styled-components';
import Button from '../../Atoms/susu/Button';

const CategoriesWrap = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
`;

const Categories = ({ items, onSelect }) => {
  return (
    <CategoriesWrap>
      {items.map((el, index) => (
        <Button onClick={() => onSelect(el.name)} key={index}>{el.text}</Button>
      ))}
    </CategoriesWrap>
  );
};

export default Categories;
