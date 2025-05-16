import React from 'react';
import styled from 'styled-components';
import SidebarItem from '../Molecules/SidearItem';


const SidebarWrap = styled.div`
  width: 240px;
  background: rgb(248, 248, 247);
  height: 100vh;
  padding-top: 20px;
  position: fixed;
`;

const Sidebar = () => {
  return (
    <SidebarWrap>
      <SidebarItem items={['홈', '글 추가' ,'개인 워크스페이스', '팀 워크스페이스' ]} />
    </SidebarWrap>
  );
};

export default Sidebar;
