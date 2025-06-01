import React, { useEffect, useState, useMemo, useRef } from "react"; // useRef 추가
import styled from "styled-components";
import { Folder, ChevronDown, Users, User, CheckSquare, XSquare } from "lucide-react";

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

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #f8f9fa;
    color: #adb5bd;
    cursor: not-allowed;
    border-color: #e9ecef;
    box-shadow: none;
    &:hover {
      border-color: #e9ecef;
      box-shadow: none;
    }
  `}
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

const ShareOptionSelector = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 16px;
  margin-bottom: 20px;
`;

const ShareOptionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ active }) => (active ? colors.gradient : "#f8f9fa")};
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

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #f8f9fa !important;
    color: #adb5bd !important;
    cursor: not-allowed !important;
    border-color: #e9ecef !important;
    box-shadow: none !important;
    &:hover {
      transform: none !important;
      box-shadow: none !important;
    }
  `}
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

const WorkSpaceSelect = ({
  workspaces = [],
  selectedWorkspaceId, // From PostForm: fk_workspace_id
  setSelectedWorkspaceId, // From PostForm: setFk_workspace_id
  isWorkspaceShared, // From PostForm: isWorkspaceShared (boolean)
  setIsWorkspaceShared, // From PostForm: setIsWorkspaceShared
  selectedPageId, // From PostForm: selectedPageId (array or single ID)
  setSelectedPageId, // From PostForm: setSelectedPageId
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectionMode, setSelectionMode] = useState("single");

  // `selectedPageId`를 항상 배열로 사용하기 위한 헬퍼 변수 (prop을 직접 바꾸지 않음)
  const normalizedSelectedPageId = useMemo(() => {
    return Array.isArray(selectedPageId)
      ? selectedPageId
      : selectedPageId
      ? [selectedPageId]
      : [];
  }, [selectedPageId]);

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

  const currentPages = useMemo(() => {
    return selectedWorkspaceId && grouped[selectedWorkspaceId]
      ? grouped[selectedWorkspaceId]
      : [];
  }, [selectedWorkspaceId, grouped]);

  // 이 useEffect는 selectionMode를 초기 설정하고,
  // isWorkspaceShared나 selectedWorkspaceId 변경 시 동기화합니다.
  // selectedPageId를 직접 변경하지 않으므로 무한 루프 위험이 적습니다.
  useEffect(() => {
    if (isWorkspaceShared && selectedWorkspaceId && grouped[selectedWorkspaceId]) {
      const allPagesInWorkspace = grouped[selectedWorkspaceId].map((p) => p.id);
      if (
        allPagesInWorkspace.length > 0 &&
        normalizedSelectedPageId.length === allPagesInWorkspace.length &&
        allPagesInWorkspace.every((id) => normalizedSelectedPageId.includes(id))
      ) {
        setSelectionMode("all");
      } else if (normalizedSelectedPageId.length === 1) {
        setSelectionMode("single");
      } else if (normalizedSelectedPageId.length > 1) {
        setSelectionMode("multiple");
      } else {
        setSelectionMode("single");
      }
    } else {
      setSelectionMode("single"); // 공유 안 함 상태이거나 워크스페이스가 선택되지 않았을 때
    }
  }, [isWorkspaceShared, selectedWorkspaceId, grouped, normalizedSelectedPageId]);


  // 이 useEffect는 isWorkspaceShared 상태 변경에 따라 주요 상태를 초기화하고,
  // selectionMode 또는 selectedWorkspaceId 변경 시 selectedPageId를 업데이트합니다.
  useEffect(() => {
    // isWorkspaceShared가 false로 변경되면 모든 상태를 초기화합니다.
    if (!isWorkspaceShared) {
      if (selectedWorkspaceId !== null) setSelectedWorkspaceId(null);
      if (normalizedSelectedPageId.length > 0) setSelectedPageId([]);
      if (selectionMode !== "single") setSelectionMode("single");
      setShowDropdown(false);
      return; // 초기화 후 더 이상 아래 로직 실행 방지
    }

    // 공유가 활성화된 상태에서 selectionMode나 selectedWorkspaceId가 변경될 때
    let newSelectedPageIds = [...normalizedSelectedPageId]; // 현재 선택된 페이지들을 복사하여 사용

    if (selectionMode === "all") {
      if (selectedWorkspaceId && grouped[selectedWorkspaceId]) {
        newSelectedPageIds = grouped[selectedWorkspaceId].map((p) => p.id);
      } else {
        newSelectedPageIds = []; // 워크스페이스가 없으면 빈 배열
      }
    } else if (selectionMode === "single") {
      // 단일 선택 모드에서 현재 선택된 페이지가 여러 개이거나, 현재 워크스페이스에 없으면 초기화
      if (
        newSelectedPageIds.length > 1 ||
        (newSelectedPageIds.length === 1 &&
          !currentPages.some((p) => p.id === newSelectedPageIds[0]))
      ) {
        newSelectedPageIds = [];
      }
    } else if (selectionMode === "multiple") {
        // 다중 선택 모드에서 현재 워크스페이스에 없는 페이지는 필터링
        newSelectedPageIds = newSelectedPageIds.filter((id) =>
            currentPages.some((p) => p.id === id)
        );
    }
    
    // 이전 selectedPageId와 실제로 다를 경우에만 업데이트하여 무한 루프 방지
    const sortedNew = newSelectedPageIds.sort();
    const sortedOld = normalizedSelectedPageId.sort();

    if (JSON.stringify(sortedNew) !== JSON.stringify(sortedOld)) {
      setSelectedPageId(newSelectedPageIds);
    }
  }, [
    isWorkspaceShared,
    selectionMode,
    selectedWorkspaceId,
    grouped,
    setSelectedWorkspaceId,
    setSelectedPageId,
    currentPages,
    normalizedSelectedPageId // normalizedSelectedPageId를 의존성에 포함 (useMemo된 값)
  ]);


  const handleToggleShare = (shareStatus) => {
    setIsWorkspaceShared(shareStatus);
    if (!shareStatus) {
      // 공유 안 함을 선택하면 워크스페이스 및 페이지 선택 초기화
      setSelectedWorkspaceId(null);
      setSelectedPageId([]);
      setShowDropdown(false);
      setSelectionMode("single");
    }
    // '워크스페이스 공유'로 전환될 때는 별도의 초기화 없음 (useEffect가 처리)
  };

  const handleWorkspaceSelect = (workspaceId) => {
    setSelectedWorkspaceId(workspaceId);
    setShowDropdown(false);

    let newSelectedPageIds = [];
    if (selectionMode === "all") {
      newSelectedPageIds = (grouped[workspaceId] || []).map((p) => p.id);
    } else {
      // 단일/복수 선택 모드에서는 워크스페이스 변경 시 기존 페이지 선택 초기화
      newSelectedPageIds = [];
    }
    // 현재 selectedPageId와 다를 경우에만 업데이트 (무한 루프 방지)
    const sortedNew = newSelectedPageIds.sort();
    const sortedOld = normalizedSelectedPageId.sort(); // normalizedSelectedPageId 사용

    if (JSON.stringify(sortedNew) !== JSON.stringify(sortedOld)) {
        setSelectedPageId(newSelectedPageIds);
    }
  };

  const handlePageClick = (pageId) => {
    if (!isWorkspaceShared || selectionMode === "all") return;

    let updatedPageIds;
    if (selectionMode === "single") {
      updatedPageIds = normalizedSelectedPageId.includes(pageId) ? [] : [pageId];
    } else { // multiple mode
      updatedPageIds = normalizedSelectedPageId.includes(pageId)
        ? normalizedSelectedPageId.filter((id) => id !== pageId)
        : [...normalizedSelectedPageId, pageId];
    }
    setSelectedPageId(updatedPageIds);
  };

  const handleChangeSelectionMode = (newMode) => {
    setSelectionMode(newMode);

    let newSelectedPageIds = [];
    if (newMode === "all") {
      if (selectedWorkspaceId && grouped[selectedWorkspaceId]) {
        newSelectedPageIds = grouped[selectedWorkspaceId].map((p) => p.id);
      }
    } else if (newMode === "single") {
      if (
        normalizedSelectedPageId.length === 1 &&
        currentPages.some((p) => p.id === normalizedSelectedPageId[0])
      ) {
        newSelectedPageIds = [normalizedSelectedPageId[0]];
      } else {
        newSelectedPageIds = [];
      }
    } else if (newMode === "multiple") {
      newSelectedPageIds = normalizedSelectedPageId.filter((id) =>
        currentPages.some((p) => p.id === id)
      );
    }
    
    // 현재 selectedPageId와 다를 경우에만 업데이트 (무한 루프 방지)
    const sortedNew = newSelectedPageIds.sort();
    const sortedOld = normalizedSelectedPageId.sort(); // normalizedSelectedPageId 사용

    if (JSON.stringify(sortedNew) !== JSON.stringify(sortedOld)) {
        setSelectedPageId(newSelectedPageIds);
    }
  };

  const dropdownButtonText =
    selectedWorkspaceId && parentMap[selectedWorkspaceId] && isWorkspaceShared
      ? parentMap[selectedWorkspaceId]
      : isWorkspaceShared
      ? "워크스페이스를 선택하세요"
      : "워크스페이스 공유 안 함";

  return (
    <Wrapper>
      <Label>
        <Folder size={18} color={colors.primary} />
        공유 설정
      </Label>

      <ShareOptionSelector>
        <ShareOptionButton
          type="button"
          active={!isWorkspaceShared}
          onClick={() => handleToggleShare(false)}
        >
          <XSquare size={14} />
          공유 안 함
        </ShareOptionButton>
        <ShareOptionButton
          type="button"
          active={isWorkspaceShared}
          onClick={() => handleToggleShare(true)}
        >
          <Users size={14} />
          워크스페이스 공유
        </ShareOptionButton>
      </ShareOptionSelector>

      <DropdownContainer>
        <DropdownButton
          type="button"
          onClick={() => isWorkspaceShared && setShowDropdown((prev) => !prev)}
          disabled={!isWorkspaceShared}
        >
          {dropdownButtonText}
          <ChevronDown size={16} />
        </DropdownButton>

        {showDropdown && isWorkspaceShared && (
          <DropdownList>
            {parentWorkspaces.length > 0 ? (
              parentWorkspaces.map((w) => (
                <DropdownItem
                  key={w.workspace_id}
                  onClick={() => handleWorkspaceSelect(w.workspace_id)}
                >
                  {parentMap[w.workspace_id]}
                </DropdownItem>
              ))
            ) : (
              <NoPagesMessage>선택 가능한 워크스페이스가 없습니다.</NoPagesMessage>
            )}
          </DropdownList>
        )}
      </DropdownContainer>

      {isWorkspaceShared && (
        <>
          <ModeSelector>
            <ModeButton
              type="button"
              active={selectionMode === "single"}
              onClick={() => handleChangeSelectionMode("single")}
              disabled={!isWorkspaceShared}
            >
              <User size={14} />
              단일 선택
            </ModeButton>
            <ModeButton
              type="button"
              active={selectionMode === "multiple"}
              onClick={() => handleChangeSelectionMode("multiple")}
              disabled={!isWorkspaceShared}
            >
              <Users size={14} />
              복수 선택
            </ModeButton>
            <ModeButton
              type="button"
              active={selectionMode === "all"}
              onClick={() => handleChangeSelectionMode("all")}
              disabled={!isWorkspaceShared}
            >
              <CheckSquare size={14} />
              전체 선택
            </ModeButton>
          </ModeSelector>

          {selectedWorkspaceId ? ( // 워크스페이스가 선택되어야 페이지를 보여줌
            currentPages.length > 0 ? (
              <>
                <SubLabel>페이지 선택</SubLabel>
                <ChipContainer>
                  {currentPages.map((page) => (
                    <Chip
                      key={page.id}
                      selected={
                        selectionMode === "all" ||
                        normalizedSelectedPageId.includes(page.id) // normalizedSelectedPageId 사용
                      }
                      disabled={!isWorkspaceShared || selectionMode === "all"}
                      onClick={() => handlePageClick(page.id)}
                    >
                      {page.name}
                    </Chip>
                  ))}
                </ChipContainer>
              </>
            ) : (
              <NoPagesMessage>선택 가능한 페이지가 없습니다.</NoPagesMessage>
            )
          ) : (
            <NoPagesMessage>워크스페이스를 선택해주세요.</NoPagesMessage> // 워크스페이스 선택 안된 경우
          )}
        </>
      )}
    </Wrapper>
  );
};

export default WorkSpaceSelect;