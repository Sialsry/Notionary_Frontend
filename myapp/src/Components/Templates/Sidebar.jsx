import React, { useState } from 'react';
import styled from 'styled-components';
import SidebarItem from '../Molecules/susu/SidearItem';
import { addicon } from '../../images';
import Sidebarcontent from '../Molecules/newworkspace/Sidebarcontent';

const SidebarWrap = styled.div`
  width: 240px;
  background: rgb(248, 248, 247);
  height: 100vh;
  padding: 50px 30px;
  position: fixed;
  box-sizing: border-box;
`;

const Sidebar = () => {

  const [privatecontent, setPrivatecontent] = useState([{ '개인 워크스페이스': [] }])
  const [teamcontent, setTeamcontent] = useState([{ '팀 워크스페이스': [] }])
  return (
    <SidebarWrap>
      <Sidebarcontent contents={privatecontent} setContent={setPrivatecontent} ></Sidebarcontent>
      <Sidebarcontent contents={teamcontent} setContent={setTeamcontent} ></Sidebarcontent>
    </SidebarWrap>
  );
};

export default Sidebar;
