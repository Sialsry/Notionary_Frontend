import React from 'react';
import styled from 'styled-components';
import Text from '../../Atoms/susu/Text';
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 20px;
`;

const SidebarItem = ({ items, onClick }) => {
  return (
    <Section>
      {items.map((item, index) => (
        <Text key={index} style={{ cursor: 'pointer' }} onClick={() => onClick && onClick(item)}
        >
          {item}
        </Text>
      ))}
    </Section>
  );
};

export default SidebarItem;
