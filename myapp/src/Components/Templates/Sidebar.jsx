import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "../Molecules/susu/SidearItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addicon } from "../../images";
import Sidebarcontent from "../Molecules/newworkspace/Sidebarcontent";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  DelWorkspace,
  getworkspaceData,
  getworkspaceDataOne,
  getworkspaceDataTwo,
} from "../../API/Workspaceapi";

const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const SidebarWrap = styled.div`
  width: 300px;
  background: white;
  height: calc(100vh - 75px);
  padding: 24px 20px 100px 20px;
  position: fixed;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 999;
  bottom: 0;
  left: 0;
  top: 75px;
  border-right: 1px solid #e9ecef;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f3f4;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.primary};
    border-radius: 3px;

    &:hover {
      background: ${colors.secondary};
    }
  }

  @media (max-width: 768px) {
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.open {
      transform: translateX(0);
    }
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  padding: 0 12px;
`;

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${({ active }) => (active ? colors.gradient : "transparent")};
  color: ${({ active }) => (active ? "white" : "#495057")};
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 4px;
  text-align: left;

  &:hover {
    background: ${({ active }) => (active ? colors.gradient : "#f8f9fa")};
    color: ${({ active }) => (active ? "white" : colors.primary)};
    transform: translateX(4px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const WorkspaceSection = styled.div`
  margin-top: 32px;
`;

const WorkspaceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin-bottom: 12px;
`;

const WorkspaceTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const AddButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #6c757d;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    color: ${colors.primary};
  }
`;

const WorkspaceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const WorkspaceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #495057;
  font-size: 14px;

  &:hover {
    background: #f8f9fa;
    color: ${colors.primary};
  }

  &::before {
    content: "📁";
    font-size: 16px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e9ecef;
  margin: 24px 0;
`;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [teamcontent, setTeamcontent] = useState([{ "팀 워크스페이스": [] }]);
  const [privatecontent, setPrivatecontent] = useState([
    { "개인 워크스페이스": [] },
  ]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getworkspacedata = async () => {
      const workspaceOne = await getworkspaceDataOne();
      console.log(workspaceOne, "workspaceOne");
      try {
        if (workspaceOne?.data.length !== 0) {
          setPrivatecontent(workspaceOne.data);
        }
        setState(false);
      } catch (error) {
        setState(false);
      }
    };
    getworkspacedata();
  }, [state]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (
    location.pathname.startsWith("/workspace") ||
    location.pathname === "/main"
  ) {
    return (
      <SidebarWrap>
        <SidebarSection>
          <NavItem
            active={isActive("/main")}
            onClick={() => handleNavigation("/main")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            홈
          </NavItem>

          <NavItem onClick={() => handleNavigation("/post")}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            글 작성
          </NavItem>
        </SidebarSection>

        <Divider />

        <WorkspaceSection>
          <WorkspaceList>
            <Sidebarcontent
              contents={privatecontent}
              setState={setState}
              setContent={setPrivatecontent}
            />
          </WorkspaceList>
        </WorkspaceSection>
      </SidebarWrap>
    );
  }

  return null;
};

export default Sidebar;
