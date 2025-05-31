import React, { useState } from "react";
import styled from "styled-components";
import { Folder, ChevronDown, Users, User, CheckSquare } from "lucide-react";

const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#f093fb",
  success: "#4ecdc4",
  warning: "#ffe066",
  info: "#74b9ff",
  danger: "#fd79a8",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gradientSuccess: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
};

const Wrapper = styled.div`
  margin-bottom: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 12px;
`;

const DropdownContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 16px;
  text-align: left;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  list-style: none;
  padding: 8px 0;
  margin: 4px 0 0 0;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%);
    color: ${colors.primary};
  }
`;

const ModeSelector = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;

const ModeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ active }) => (active ? colors.gradientSuccess : "#f8f9fa")};
  color: ${({ active }) => (active ? "white" : "#6c757d")};
  border: 2px solid ${({ active }) => (active ? "transparent" : "#e9ecef")};
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SubLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 12px;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.div`
  padding: 10px 16px;
  background: ${({ selected }) => (selected ? colors.gradient : "#f8f9fa")};
  color: ${({ selected }) => (selected ? "white" : "#495057")};
  border: 2px solid ${({ selected }) => (selected ? "transparent" : "#e9ecef")};
  border-radius: 25px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  user-select: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-1px)")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 12px rgba(0, 0, 0, 0.1)"};
  }
`;

const WorkSpaceSelector = ({ workspaces = [], value = [], onChange }) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [selectedPageIds, setSelectedPageIds] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectionMode, setSelectionMode] = useState("single");

  const parentWorkspaces = workspaces.filter((item) => !item.parent_id);
  const grouped = {};

  workspaces
    .filter((item) => item.parent_id)
    .forEach((item) => {
      const parent = parentWorkspaces.find(
        (p) =>
          p.workspacectgrs_name === item.parent_id ||
          p.workspace_name === item.parent_id
      );
      const parentId = parent ? parent.workspace_id : null;
      if (!parentId) return;
      if (!grouped[parentId]) grouped[parentId] = [];
      grouped[parentId].push({
        id: item.workspace_id,
        name: item.workspacesubctgrs_name,
      });
    });

  const parentMap = {};
  parentWorkspaces.forEach((p) => {
    parentMap[p.workspace_id] =
      p.workspacectgrs_name ||
      p.workspace_name ||
      `워크스페이스 ${p.workspace_id}`;
  });

  const handleWorkspaceSelect = (workspaceId) => {
    setSelectedWorkspace(workspaceId);
    setSelectedPageIds([]);
    setShowDropdown(false);
    onChange([], workspaceId);
  };

  const handlePageClick = (pageId) => {
    if (selectionMode === "single") {
      setSelectedPageIds([pageId]);
      onChange([pageId], selectedWorkspace);
    } else if (selectionMode === "multiple") {
      const updated = selectedPageIds.includes(pageId)
        ? selectedPageIds.filter((id) => id !== pageId)
        : [...selectedPageIds, pageId];
      setSelectedPageIds(updated);
      onChange(updated, selectedWorkspace);
    }
  };

  const handleSelectAll = () => {
    const allPages = grouped[selectedWorkspace] || [];
    const allIds = allPages.map((p) => p.id);
    setSelectedPageIds(allIds);
    onChange(allIds, selectedWorkspace);
  };

  return (
    <Wrapper>
      <Label>
        <Folder size={18} color={colors.primary} />
        공유할 워크스페이스
      </Label>

      <DropdownContainer>
        <DropdownButton
          type="button"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {selectedWorkspace
            ? parentMap[selectedWorkspace]
            : "워크스페이스를 선택하세요"}
          <ChevronDown size={16} />
        </DropdownButton>

        {showDropdown && (
          <DropdownList>
            {parentWorkspaces.map((w) => (
              <DropdownItem
                key={w.workspace_id}
                onClick={() => handleWorkspaceSelect(w.workspace_id)}
              >
                {parentMap[w.workspace_id]}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>

      {selectedWorkspace && grouped[selectedWorkspace]?.length > 0 && (
        <>
          <ModeSelector>
            <ModeButton
              type="button"
              active={selectionMode === "single"}
              onClick={() => {
                setSelectionMode("single");
                setSelectedPageIds([]);
                onChange([], selectedWorkspace);
              }}
            >
              <User size={14} />
              단일 선택
            </ModeButton>
            <ModeButton
              type="button"
              active={selectionMode === "multiple"}
              onClick={() => {
                setSelectionMode("multiple");
                setSelectedPageIds([]);
                onChange([], selectedWorkspace);
              }}
            >
              <Users size={14} />
              복수 선택
            </ModeButton>
            <ModeButton
              type="button"
              active={selectionMode === "all"}
              onClick={() => {
                setSelectionMode("all");
                handleSelectAll();
              }}
            >
              <CheckSquare size={14} />
              전체 선택
            </ModeButton>
          </ModeSelector>

          <SubLabel>페이지 선택</SubLabel>
          <ChipContainer>
            {grouped[selectedWorkspace].map((page) => (
              <Chip
                key={page.id}
                selected={
                  selectionMode === "all"
                    ? true
                    : selectedPageIds.includes(page.id)
                }
                disabled={selectionMode === "all"}
                onClick={() => {
                  if (selectionMode !== "all") handlePageClick(page.id);
                }}
              >
                {page.name}
              </Chip>
            ))}
          </ChipContainer>
        </>
      )}
    </Wrapper>
  );
};

export default WorkSpaceSelector;
