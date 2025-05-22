<<<<<<< HEAD:myapp/src/Components/Molecules/susu/SidearItem.jsx
import React from 'react';
import styled from 'styled-components';
import Text from '../../Atoms/susu/Text';
=======
import React from "react";
import styled from "styled-components";
import Text from "../Atoms/ming/Text";
>>>>>>> ming:myapp/src/Components/Molecules/SidearItem.jsx

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 20px;
`;

const SidebarItem = ({ items }) => {
  return (
    <Section>
      {items.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </Section>
  );
};

export default SidebarItem;
