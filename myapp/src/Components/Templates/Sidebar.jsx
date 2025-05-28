import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SidebarItem from '../Molecules/susu/SidearItem';
import { addicon } from '../../images';
import Sidebarcontent from '../Molecules/newworkspace/Sidebarcontent';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getworkspaceData, getworkspaceDataOne, getworkspaceDataTwo } from '../../API/Workspaceapi';

const SidebarWrap = styled.div`
  width: 240px;
  background: rgb(248, 248, 247);
  height: 100vh;
  padding: 50px 30px;
  position: fixed;
  box-sizing: border-box;
`;

const Sidebar = () => {
  const [state, setState] = useState(false)
  // const [teamcontent, setTeamcontent] = useState([])
  // const [privatecontent, setPrivatecontent] = useState([])
    const [teamcontent, setTeamcontent] = useState([{ '팀 워크스페이스': [] }])
  const [privatecontent, setPrivatecontent] = useState([{ '개인 워크스페이스': [] }])
  const queryClient = useQueryClient();





  // const { data: workspacedataOne, isLoading: isLoadingOne } = useQuery({
  //   queryKey: ['dataOne'],
  //   queryFn: getworkspaceDataOne,
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: true,
  //   enabled: true,
  //   retry: 10,
    
  // })

  // const { data: workspacedataTwo, isLoading: isLoadingTwo } = useQuery({
  //   queryKey: ['dataTwo'],
  //   queryFn: getworkspaceDataTwo,
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: true,
  //   enabled: true,
  //   retry: 10
  // })

  
  useEffect(() => {
    const getworkspacedata = async () => {
      const workspaceOne = await getworkspaceDataOne()
      const workspaceTwo = await getworkspaceDataTwo()
      if(workspaceOne  && workspaceTwo) {
      setPrivatecontent(workspaceOne.data)
      setTeamcontent(workspaceTwo.data)
      console.log(privatecontent, teamcontent,'sdf', workspaceTwo.data, workspaceOne.data)
      setState(false)
      }
    }
    getworkspacedata()
    
  },[state])
  // useEffect(() => {
    
  //   console.log(privatecontent, teamcontent,'sdf')
  // }, [privatecontent])
  // const newData = data?.data

  // console.log(newData[0], "asdf", newData[1])
  // useEffect(() => {

  //   if(!isLoadingOne && !isLoadingTwo){
  //     console.log(Array.isArray(workspacedataTwo.data), workspacedataTwo, 'trueadsad');
  //   }
  // }, [])
  // if(isLoadingOne || isLoadingTwo) return;


  // useEffect(() => {
    
  //   if (!isLoadingOne && !isLoadingTwo) {
  //     setPrivatecontent(workspacedataOne.data[0] )
  //     console.log(workspacedataOne.data[0], 'usequery1', teamcontent1)
  //     console.log(typeof (privatecontent), 'usequery2')
  //     console.log(teamcontent, 'usequery3')
  //     console.log(workspacedataTwo.data, 'usequery4')
  //     setTeamcontent(workspacedataTwo.data[0] )
  //   }
  // }, [state])
  // if (data?.data === '개인 워크스페이스') {

  //   setPrivatecontent(data.data[0])

  // }
  // if (data?.data === '팀 워크스페이스') {
  //   console.log(data?.data[0])
  //   setPrivatecontent(data.data[0])
  //   console.log('zzzzzzz')
  // }

  // const [privatecontent, setPrivatecontent] = useState([{ '개인 워크스페이스': [] }])
  // const [teamcontent, setTeamcontent] = useState([{ '팀 워크스페이스': [] }])

  useEffect(() => {
    console.log(typeof (privatecontent), 'private', teamcontent)
  }, [privatecontent, teamcontent])
  // if()
  return (
    <SidebarWrap>
      <Sidebarcontent contents={privatecontent} setState={setState} setContent={setPrivatecontent} ></Sidebarcontent>
      <Sidebarcontent contents={teamcontent} setState={setState} setContent={setTeamcontent} ></Sidebarcontent>
    </SidebarWrap>
  );
};

export default Sidebar;
