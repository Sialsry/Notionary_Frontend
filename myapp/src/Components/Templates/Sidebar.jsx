import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SidebarItem from '../Molecules/susu/SidearItem';
import { addicon } from '../../images';
import Sidebarcontent from '../Molecules/newworkspace/Sidebarcontent';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getworkspaceData } from '../../API/Workspaceapi';

const SidebarWrap = styled.div`
  width: 240px;
  background: rgb(248, 248, 247);
  height: 100vh;
  padding: 50px 30px;
  position: fixed;
  box-sizing: border-box;
`;

const Sidebar = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: getworkspaceData,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: true,
    retry: 10
  })
  // const newData = data.map(el => [el])
  console.log(data?.data[0][0], 'query')
  if (data?.data[0][0] === '개인워크스페이스') {
    setPrivatecontent(data.data[0][0])
    
  }
  if (data?.data[0][0] === '개인워크스페이스') {
    console.log(data?.data[0][0])
    setPrivatecontent(data.data[0][0])
    console.log('zzzzzzz')
  }
  
  const [privatecontent, setPrivatecontent] = useState([])
  const [teamcontent, setTeamcontent] = useState([{ '팀워크스페이스': [] }])
  
  useEffect (() => {
    console.log(privatecontent,'private', privatecontent)
  },[privatecontent, teamcontent])

  return (
    <SidebarWrap>
      <Sidebarcontent contents={privatecontent} setContent={setPrivatecontent} ></Sidebarcontent>
      {/* <Sidebarcontent contents={teamcontent} setContent={setTeamcontent} ></Sidebarcontent> */}
    </SidebarWrap>
  );
};

export default Sidebar;
