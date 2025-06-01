import React, { useState, useEffect, useMemo } from "react";
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

const NoPagesMessage = styled.div`
  color: #6c757d;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  padding: 20px 0;
`;

const WorkSpaceSelector = ({
  workspaces = [],
  selectedWorkspaceId, // From PostForm: fk_workspace_id
  setSelectedWorkspaceId, // From PostForm: setFk_workspace_id
  isWorkspaceShared, // From PostForm: isWorkspaceShared (boolean)
  setIsWorkspaceShared, // From PostForm: setIsWorkspaceShared
  selectedPageId, // From PostForm: selectedPageId (array or single ID)
  setSelectedPageId, // From PostForm: setSelectedPageId
}) => {
  // Internal state for managing UI interactions
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectionMode, setSelectionMode] = useState("single"); // Default to single

  // Memoized lists for efficiency
  const parentWorkspaces = useMemo(() => {
    return workspaces.filter((item) => !item.parent_id);
  }, [workspaces]);

  const grouped = useMemo(() => {
    return workspaces.reduce((acc, item) => {
      if (item.parent_id) {
        const parent = parentWorkspaces.find(
          (p) =>
            p.workspacectgrs_name === item.parent_id ||
            p.workspace_name === item.parent_id
        );
        const parentId = parent ? parent.workspace_id : null;
        if (parentId) {
          if (!acc[parentId]) acc[parentId] = [];
          acc[parentId].push({
            id: item.workspace_id,
            name: item.workspacesubctgrs_name || `페이지 ${item.workspace_id}`,
          });
        }
      }
      return acc;
    }, {});
  }, [workspaces, parentWorkspaces]);

  const parentMap = useMemo(() => {
    return parentWorkspaces.reduce((acc, p) => {
      acc[p.workspace_id] =
        p.workspacectgrs_name ||
        p.workspace_name ||
        `워크스페이스 ${p.workspace_id}`;
      return acc;
    }, {});
  }, [parentWorkspaces]);

  const currentPages =
    selectedWorkspaceId && grouped[selectedWorkspaceId]
      ? grouped[selectedWorkspaceId]
      : [];

  // --- Initial state and update logic for props ---
  useEffect(() => {
    // Set initial selected workspace based on prop
    if (selectedWorkspaceId !== null) {
      setSelectedWorkspaceId(selectedWorkspaceId);
    }
  }, [selectedWorkspaceId, setSelectedWorkspaceId]);

  useEffect(() => {
    // Set initial selected pages based on prop
    // Ensure selectedPageId is an array for internal consistency
    const pages = Array.isArray(selectedPageId) ? selectedPageId : (selectedPageId ? [selectedPageId] : []);
    setSelectedPageId(pages);

    // Determine initial selection mode
    if (isWorkspaceShared && selectedWorkspaceId && grouped[selectedWorkspaceId]) {
      const allPagesInWorkspace = grouped[selectedWorkspaceId].map(p => p.id);
      if (allPagesInWorkspace.length > 0 && pages.length === allPagesInWorkspace.length &&
          allPagesInWorkspace.every(id => pages.includes(id))) {
        setSelectionMode("all");
      } else if (pages.length === 1) {
        setSelectionMode("single");
      } else if (pages.length > 1) {
        setSelectionMode("multiple");
      } else {
        setSelectionMode("single"); // Default if no pages or unknown state
      }
    } else {
        setSelectionMode("single"); // Default if not shared or no workspace selected
    }
  }, [selectedPageId, setSelectedPageId, isWorkspaceShared, selectedWorkspaceId, grouped]);


  // When selectionMode or selectedWorkspaceId changes, update selectedPageId and call parent's onChange
  useEffect(() => {
    let newSelectedPageIds = Array.isArray(selectedPageId) ? [...selectedPageId] : (selectedPageId ? [selectedPageId] : []);

    if (selectionMode === "all" && selectedWorkspaceId && grouped[selectedWorkspaceId]) {
      newSelectedPageIds = grouped[selectedWorkspaceId].map((p) => p.id);
    } else if (selectionMode === "single") {
        // If current selection has more than one, or none, reset to empty
        if (newSelectedPageIds.length > 1 || (newSelectedPageIds.length === 1 && !currentPages.find(p => p.id === newSelectedPageIds[0]))) {
            newSelectedPageIds = [];
        }
    }

    // Only update if something actually changed to prevent infinite loops
    if (JSON.stringify(newSelectedPageIds.sort()) !== JSON.stringify(selectedPageId.sort())) {
        setSelectedPageId(newSelectedPageIds);
    }
  }, [selectionMode, selectedWorkspaceId, grouped, selectedPageId, setSelectedPageId, currentPages]);


  const handleWorkspaceSelect = (workspaceId) => {
    setSelectedWorkspaceId(workspaceId);
    setShowDropdown(false);
    setIsWorkspaceShared(true); // Selecting a workspace means it's shared

    let newSelectedPageIds = [];
    if (selectionMode === "all") {
      newSelectedPageIds = (grouped[workspaceId] || []).map((p) => p.id);
    }
    setSelectedPageId(newSelectedPageIds);
  };

  const handlePageClick = (pageId) => {
    if (!isWorkspaceShared) return; // Only allow page selection if sharing is enabled

    if (selectionMode === "all") return; // Cannot select individual pages in "all" mode

    let updatedPageIds;
    if (selectionMode === "single") {
      updatedPageIds = selectedPageId.includes(pageId) ? [] : [pageId];
    } else {
      updatedPageIds = selectedPageId.includes(pageId)
        ? selectedPageId.filter((id) => id !== pageId)
        : [...selectedPageId, pageId];
    }
    setSelectedPageId(updatedPageIds);
  };

  const handleChangeSelectionMode = (newMode) => {
    setSelectionMode(newMode);
    setIsWorkspaceShared(true); // Changing mode implies sharing

    let newSelectedPageIds = [];
    if (newMode === "all") {
      if (selectedWorkspaceId && grouped[selectedWorkspaceId]) {
        newSelectedPageIds = grouped[selectedWorkspaceId].map((p) => p.id);
      }
    } else if (newMode === "single") {
      // If current selection has one item and it's valid, keep it, otherwise clear.
      if (selectedPageId.length === 1 && currentPages.find(p => p.id === selectedPageId[0])) {
        newSelectedPageIds = selectedPageId;
      } else {
        newSelectedPageIds = [];
      }
    } else if (newMode === "multiple") {
        // If coming from 'single' with a valid page, keep it. Otherwise, initialize empty.
        if (selectionMode === 'single' && selectedPageId.length === 1 && currentPages.find(p => p.id === selectedPageId[0])) {
            newSelectedPageIds = selectedPageId;
        } else {
            // When switching to multiple, if no pages were selected or it was 'all', start fresh.
            // Or, if there are existing valid pages, keep them.
            newSelectedPageIds = selectedPageId.filter(id => currentPages.some(p => p.id === id));
        }
    }
    setSelectedPageId(newSelectedPageIds);
  };

  const dropdownButtonText =
    selectedWorkspaceId && parentMap[selectedWorkspaceId]
      ? parentMap[selectedWorkspaceId]
      : "워크스페이스를 선택하세요";

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
          {dropdownButtonText}
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

      {/* Only show sharing options if a workspace is selected or if it was previously shared */}
      {(selectedWorkspaceId || isWorkspaceShared) && (
        <>
          <ModeSelector>
            <ModeButton
              type="button"
              active={selectionMode === "single"}
              onClick={() => handleChangeSelectionMode("single")}
            >
              <User size={14} />
              단일 선택
            </ModeButton>
            <ModeButton
              type="button"
              active={selectionMode === "multiple"}
              onClick={() => handleChangeSelectionMode("multiple")}
            >
              <Users size={14} />
              복수 선택
            </ModeButton>
            <ModeButton
              type="button"
              active={selectionMode === "all"}
              onClick={() => handleChangeSelectionMode("all")}
            >
              <CheckSquare size={14} />
              전체 선택
            </ModeButton>
          </ModeSelector>

          {currentPages.length > 0 ? (
            <>
              <SubLabel>페이지 선택</SubLabel>
              <ChipContainer>
                {currentPages.map((page) => (
                  <Chip
                    key={page.id}
                    selected={
                      selectionMode === "all" ||
                      selectedPageId.includes(page.id)
                    }
                    disabled={selectionMode === "all"}
                    onClick={() => handlePageClick(page.id)}
                  >
                    {page.name}
                  </Chip>
                ))}
              </ChipContainer>
            </>
          ) : (
            <NoPagesMessage>선택 가능한 페이지가 없습니다.</NoPagesMessage>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default WorkSpaceSelector;