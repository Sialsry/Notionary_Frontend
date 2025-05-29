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

const SidebarItem = ({ items }) => {
  const subitems = ['1','2', '3']
  const clickHandler = async () => {
    await axios.get('')
  }
  console.log(items)
  return (
    <Section>
      {items.map((item, index) => (
        <Text key={index}>{item.name} <img onClick={clickHandler} src={item.Symbol ? item.Symbol : null} alt="" /></Text>
      ))}
        {subitems ? subitems.map((el,index) => (<ul>
          <li>{el}</li>
        </ul>)) : null }
    </Section>
  );
};

export default SidebarItem;
