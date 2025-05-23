import React from 'react';
import styled from 'styled-components';
import SidebarItem from '../Molecules/susu/SidearItem';
import { addicon } from '../../images';

const SidebarWrap = styled.div`
  width: 240px;
  background: rgb(248, 248, 247);
  height: 100vh;
  padding: 50px 30px;
  position: fixed;
  box-sizing: border-box;
`;

const Sidebar = () => {
  return (
    <SidebarWrap>
      <SidebarItem items={[{name : '홈'}, 
        {name : '글 추가'} ,
        {name : '개인 워크스페이스', Symbol : addicon}, 
        ]} >
          <SidebarItem items={[{name : '팀 워크스페이스', Symbol : addicon}]}>
            </SidebarItem> 
        </SidebarItem>
    </SidebarWrap>
  );
};

export default Sidebar;
