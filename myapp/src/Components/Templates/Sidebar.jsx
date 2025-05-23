import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SidebarItem from '../Molecules/susu/SidearItem';

const SidebarWrap = styled.div`
  width: 240px;
  background: rgb(248, 248, 247);
  height: 100vh;
  padding-top: 20px;
  position: fixed;
  margin-top: 75px;
`;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
     console.log('Clicked:', item);
    if (item === '글 추가') {
      navigate('/post');
    }
  };

  return (
    <SidebarWrap>
      <SidebarItem items={['홈', '글 추가', '개인 워크스페이스', '팀 워크스페이스']} onClick={handleItemClick} />
    </SidebarWrap>
  );
};

export default Sidebar;
