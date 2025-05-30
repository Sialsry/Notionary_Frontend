import { useNavigate } from "react-router-dom";
import SidebarItem from "../Molecules/susu/SidearItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addicon } from "../../images";
import Sidebarcontent from "../Molecules/newworkspace/Sidebarcontent";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getworkspaceData,
  getworkspaceDataOne,
  getworkspaceDataTwo,
} from "../../API/Workspaceapi";

const SidebarWrap = styled.div`
  width: 300px;
  background: rgb(248, 248, 247);
  height: 100vh;
  padding: 0px 0px 100px 40px;
  position: fixed;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const Sidebar = ({ setPagestate }) => {
  const navigate = useNavigate();
  const handleItemClick = (item) => {
    console.log("Clicked:", item);
    if (item === "글 추가") {
      navigate("/post");
    }
  };
  const [state, setState] = useState(false);
  const [teamcontent, setTeamcontent] = useState([{ "팀 워크스페이스": [] }]);
  const [privatecontent, setPrivatecontent] = useState([
    { "개인 워크스페이스": [] },
  ]);
  const queryClient = useQueryClient();

  console.log(setPagestate, "setPage");
  useEffect(() => {
    const getworkspacedata = async () => {
      const workspaceOne = await getworkspaceDataOne();
      const workspaceTwo = await getworkspaceDataTwo();
      console.log(workspaceOne, workspaceTwo, "workspaceOne, workspaceTwo");
      if (workspaceOne.data.length !== 0) {
        setPrivatecontent(workspaceOne.data);
      }
      if (workspaceTwo.data.length !== 0) {
        setTeamcontent(workspaceTwo.data);
      }
    };
    getworkspacedata();
  }, [state]);

  return (
    <SidebarWrap>
      <SidebarItem items={["홈", "글 추가"]} onClick={handleItemClick} />
      <Sidebarcontent
        contents={privatecontent}
        setState={setState}
        setContent={setPrivatecontent}
        setPagestate={setPagestate}
      ></Sidebarcontent>
      <Sidebarcontent
        contents={teamcontent}
        setState={setState}
        setContent={setTeamcontent}
        setPagestate={setPagestate}
      ></Sidebarcontent>
    </SidebarWrap>
  );
};

export default Sidebar;
