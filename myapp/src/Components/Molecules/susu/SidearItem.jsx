import React from 'react';
import styled from 'styled-components';
import Text from '../../Atoms/susu/Text';
import { addicon } from '../../../images';
import axios from 'axios';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  /* margin-bottom: 20px; */
  cursor: pointer;

  img:hover {
    background-color: #c2c2c2;
    border-radius: 3px;
  }
  li {
    list-style: none;
  }
`

const SidebarItem = ({ items, onClick }) => {
  return (
    <Section>
      {items.map((item, index) => (
        <Text key={index} style={{ cursor: 'pointer' }} onClick={() => onClick && onClick(item)}
        >
          {item}
        </Text>
      ))}
        {subitems ? subitems.map((el,index) => (<ul>
          <li>{el}</li>
        </ul>)) : null }
    </Section>
  );
};

export default SidebarItem;
