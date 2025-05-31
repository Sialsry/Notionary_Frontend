import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '../../Atoms/susu/Text';

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const DropdownButton = styled.button`
  padding: 10px;
  width: 100%;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  background: white;
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const Chip = styled.div`
  padding: 8px 12px;
  background-color: ${({ selected }) => (selected ? '#e6e6fa' : '#e0e0e0')};
  color: ${({ selected }) => (selected ? '#333' : '#fff')};
  border-radius: 20px;
  cursor: pointer;
  user-select: none;
`;

const ModeSelector = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ModeButton = styled.button`
  padding: 6px 12px;
  border-radius: 20px;
  background-color: ${({ active }) => (active ? '#007bff' : '#ccc')};
  color: white;
  border: none;
  cursor: pointer;
`;

const WorkSpaceSelector = ({ workspaces = [], value = [], onChange }) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [selectedPageIds, setSelectedPageIds] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectionMode, setSelectionMode] = useState('single'); // 'single' | 'multiple' | 'all'

  const parentWorkspaces = workspaces.filter(item => !item.parent_id);
  const grouped = {};

  workspaces.filter(item => item.parent_id).forEach(item => {
    const parent = parentWorkspaces.find(
      (p) => p.workspacectgrs_name === item.parent_id || p.workspace_name === item.parent_id
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
  parentWorkspaces.forEach(p => {
    parentMap[p.workspace_id] = p.workspacectgrs_name || p.workspace_name || `워크스페이스 ${p.workspace_id}`;
  });

  const handleWorkspaceSelect = (workspaceId) => {
    setSelectedWorkspace(workspaceId);
    setSelectedPageIds([]);
    setShowDropdown(false);
    onChange([], workspaceId);
  };

  const handlePageClick = (pageId) => {
    if (selectionMode === 'single') {
      setSelectedPageIds([pageId]);
      onChange([pageId], selectedWorkspace);
    } else if (selectionMode === 'multiple') {
      const updated = selectedPageIds.includes(pageId)
        ? selectedPageIds.filter(id => id !== pageId)
        : [...selectedPageIds, pageId];
      setSelectedPageIds(updated);
      onChange(updated, selectedWorkspace);
    }
  };

  const handleSelectAll = () => {
    const allPages = grouped[selectedWorkspace] || [];
    const allIds = allPages.map(p => p.id);
    setSelectedPageIds(allIds);
    onChange(allIds, selectedWorkspace);
  };

  return (
    <Wrapper>
      <Text>공유할 워크스페이스</Text>
      <DropdownButton type="button" onClick={() => setShowDropdown(prev => !prev)}>
        {selectedWorkspace ? parentMap[selectedWorkspace] : '워크스페이스를 선택하세요'}
      </DropdownButton>

      {showDropdown && (
        <DropdownList>
          {parentWorkspaces.map(w => (
            <DropdownItem
              key={w.workspace_id}
              onClick={() => handleWorkspaceSelect(w.workspace_id)}
            >
              {parentMap[w.workspace_id]}
            </DropdownItem>
          ))}
        </DropdownList>
      )}

      {selectedWorkspace && grouped[selectedWorkspace]?.length > 0 && (
        <>
          <ModeSelector>
            <ModeButton
              type="button"
              active={selectionMode === 'single'}
              onClick={() => {
                setSelectionMode('single');
                setSelectedPageIds([]);
                onChange([], selectedWorkspace);
              }}
            >
              단일 선택
            </ModeButton>
            <ModeButton
              type="button"
              active={selectionMode === 'multiple'}
              onClick={() => {
                setSelectionMode('multiple');
                setSelectedPageIds([]);
                onChange([], selectedWorkspace);
              }}
            >
              복수 선택
            </ModeButton>
            <ModeButton
              type="button"
              active={selectionMode === 'all'}
              onClick={() => {
                setSelectionMode('all');
                handleSelectAll();
              }}
            >
              전체 선택
            </ModeButton>
          </ModeSelector>

          <Text style={{ marginTop: '12px' }}>페이지 선택</Text>
          <ChipContainer>
            {grouped[selectedWorkspace].map((page) => (
              <Chip
                key={page.id}
                selected={
                  selectionMode === 'all'
                    ? true
                    : selectedPageIds.includes(page.id)
                }
                onClick={() => {
                  if (selectionMode !== 'all') handlePageClick(page.id);
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
