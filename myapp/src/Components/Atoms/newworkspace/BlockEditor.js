import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { getBlock, getBlock2, saveData } from '../../../API/Workspaceapi';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const BlockEditorContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 50px;
`;

const Block = styled.div`
  margin-bottom: 8px;
  
`;

const BlockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  position: relative;
  min-height: 36px;

  &.dragging {
    opacity: 0.5;
  }

  &.drag-over-top::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #007AFF;
  }

  &.drag-over-bottom::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #007AFF;
  }
`;

const BlockControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
  height: 36px;
  padding-top: 2px;

  ${BlockContainer}:hover & {
    opacity: 1;
  }
`;

const BlockTypeSelector = styled.div`
  position: relative;
`;

const BlockTypeButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 24px;
  color: #9B9B9B;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  line-height: 1;

  &:hover {
    background-color: #F1F1F1;
    color: #37352F;
  }
`;

const BlockTypeDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #E6E6E6;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 260px;
  margin-top: 4px;
`;

const BlockTypeOption = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;
  color: #37352F;

  &:hover {
    background-color: #F1F1F1;
  }
`;

const DragHandle = styled.div`
  cursor: grab;
  color: #9B9B9B;
  font-size: 20px;
  margin-bottom: 2px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;

  &:hover {
    color: #37352F;
  }
`;

const BlockContent = styled.div`
  flex: 1;
  min-width: 0;
  display: block;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  outline: none;
  padding: 4px 0;
  line-height: 1.3;
  text-align: left;
`;

const TextBlock = styled.div`
  outline: none;
  padding: 4px 0;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  width: 100%;
  text-align: left;
  &[contenteditable]:empty::before {
    content: attr(data-placeholder);
    color: #aaa;
    pointer-events: none;
    display: block;}
`;

const List = styled.ul`
  margin: 0;
  padding-left: 24px;
  width: 100%;
  text-align: left;
`;

const OrderedList = styled.ol`
  margin: 0;
  padding-left: 24px;
  width: 100%;
  text-align: left;
`;

const ListItem = styled.li`
  outline: none;
  padding: 4px 0;
  line-height: 1.5;
  text-align: left;
`;

const CheckboxBlock = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const Checkbox = styled.input`
  margin: 0;
  margin-top: 4px;
`;

const CheckboxText = styled.span`
  outline: none;
  padding: 4px 0;
  flex: 1;
  line-height: 1.5;
  text-align: left;
`;

const ImageBlock = styled.div`
  width: 100%;
  margin: 8px 0;
`;

const ImageUploadPlaceholder = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #007AFF;
    background-color: #f8f9fa;
  }
`;

const UploadIcon = styled.div`
  font-size: 32px;
  color: #666;
  margin-bottom: 8px;
`;

const UploadText = styled.div`
  color: #666;
  font-size: 14px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 500px;
  border-radius: 8px;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const BlockEditor = () => {
  const [blocks, setBlocks] = useState([
    { id: 1, type: 'text', content: '', checked: false },
  ]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [dragOverBlock, setDragOverBlock] = useState(null);
  const [dragOverPosition, setDragOverPosition] = useState(null); // 'top' or 'bottom'
  const blockRefs = useRef({});
  const fileInputRef = useRef(null);
  const [blockstate, setBlockstate] = useState(true)
  const { workspacename, foldername, filename } = useParams();
  console.log(workspacename, foldername, filename, '2222222222222222222')



  useEffect(() => {
    // saveData(blocks)
    console.log(blockRefs, ' blockref')
    console.log('check1')
  }, [blocks])

  const blockTypes = [
    { id: 'text', label: 'T 텍스트' },
    { id: 'h1', label: 'H1 제목' },
    { id: 'ul', label: '글머리 기호 목록' },
    { id: 'ol', label: '번호 매기기 목록' },
    { id: 'checkbox', label: '할 일 목록' },
    { id: 'image', label: '이미지' },
  ];

  const dispatch = useDispatch();
  // const onchangeHandler = async (e) => {
  //   await dispatch('POST', {workspacename, foldername, filename, data : blocks})
  //   console.log(e)

  // }
  // const textData = useSelector(state => state.textreducer)
  // console.log(textData, 'textdata')
  useEffect(() => {
    const run = async () => {
      const newData = await getBlock2(workspacename, foldername, filename)
      console.log(newData, 'newdata',)
      setBlockstate(true)
      if (blockstate && newData) {
        setBlocks(newData.data)
        setBlockstate(false)
        console.log(blocks, 'blocks111')
      }
    }

    run()
  }, [])

  const addBlock = (type, currentId) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: '',
      checked: false,
    };
    setBlocks(prev => {
      const index = prev.findIndex(b => b.id === currentId);
      const newBlocks = [...prev];
      newBlocks.splice(index + 1, 0, newBlock);
      return newBlocks;
    });

    setTimeout(() => {
      const newEl = blockRefs.current[newBlock.id];
      if (newEl) newEl.focus();
    }, 0);
  };

  const updateBlockContent = (id, content) => {
    setBlocks(blocks.map(b => (b.id === id ? { ...b, content } : b)));
  };

  const updateCheckbox = (id, checked) => {
    setBlocks(blocks.map(b => (b.id === id ? { ...b, checked } : b)));
  };

  const changeBlockType = (id, newType) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, type: newType } : block
    ));

    // 이미지 타입으로 변경되면 아래에 텍스트 블록 추가
    if (newType === 'image') {
      const currentIndex = blocks.findIndex(block => block.id === id);
      const newBlock = {
        id: Date.now(),
        type: 'h1',
        content: '',
        checked: false,
      };

      setBlocks(prev => {
        const newBlocks = [...prev];
        newBlocks.splice(currentIndex + 1, 0, newBlock);
        return newBlocks;
      });

      // 새로 추가된 블록에 포커스
      setTimeout(() => {
        const newBlockElement = blockRefs.current[newBlock.id];
        if (newBlockElement) {
          newBlockElement.focus();
        }
      }, 0);
    }

    setActiveDropdown(null);
  };

  const isCursorAtStart = (el) => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return false;
    const range = sel.getRangeAt(0);
    const preCaret = range.cloneRange();
    preCaret.selectNodeContents(el);
    preCaret.setEnd(range.startContainer, range.startOffset);
    return preCaret.toString().length === 0;
  };

  const isCursorAtEnd = (el) => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return false;
    const range = sel.getRangeAt(0);
    const postCaret = range.cloneRange();
    postCaret.selectNodeContents(el);
    postCaret.setStart(range.endContainer, range.endOffset);
    return postCaret.toString().length === 0;
  };

  const moveCursorToEnd = (el) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const moveCursorToStart = (el) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const handleKeyDown = async (e, blockId, type) => {
    // dispatch({
    //   type: 'POST',
    //   payload: { workspacename, foldername, filename, data: blocks }
    // })
    // dispatch({
    //   type: 'POST',
    //   payload: { workspacename, foldername, filename, data: blocks }
    // })

    const index = blocks.findIndex(b => b.id === blockId);
    const currentEl = blockRefs.current[blockId];
    if (!currentEl) return;

    const prevBlock = blocks[index - 1];
    const nextBlock = blocks[index + 1];

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addBlock(type === 'image' ? 'h1' : type, blockId);
    } else if (e.key === 'Backspace') {
      const isAtStart = isCursorAtStart(currentEl);
      const currentText = currentEl.textContent;

      if (isAtStart && index > 0) {
        e.preventDefault();
        if (!currentText || currentText.trim() === '') {
          setBlocks(prev => prev.filter((_, i) => i !== index));
          setTimeout(() => {
            const prevEl = blockRefs.current[prevBlock.id];
            if (prevEl) {
              prevEl.focus();
              moveCursorToEnd(prevEl);
            }
          }, 0);
        } else {
          const prevEl = blockRefs.current[prevBlock.id];
          if (prevEl) {
            prevEl.focus();
            moveCursorToEnd(prevEl);
          }
        }
      }
    } else if (e.key === 'ArrowUp') {
      if (isCursorAtStart(currentEl) && prevBlock) {
        e.preventDefault();
        const prevEl = blockRefs.current[prevBlock.id];
        if (prevEl) {
          prevEl.focus();
          moveCursorToEnd(prevEl);
        }
      }
    } else if (e.key === 'ArrowDown') {
      if (isCursorAtEnd(currentEl) && nextBlock) {
        e.preventDefault();
        const nextEl = blockRefs.current[nextBlock.id];
        if (nextEl) {
          nextEl.focus();
          moveCursorToStart(nextEl);
        }
      }
    }
    // const newData = await getBlock(workspacename, foldername, filename, { data: blocks })
    setBlockstate(true)

  };

  useEffect(() => {
    const run = async () => {
      // setBlockstate(true)
      const newData = await getBlock(workspacename, foldername, filename, { data: blocks })
      if (blockstate ) {
        setBlockstate(false)
        console.log(blocks, 'blocks111')
      }


    }
    run()
  }, [blockstate])

  const handleDragStart = (e, blockId) => {
    setDraggedBlock(blockId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, blockId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const blockElement = e.currentTarget;
    const rect = blockElement.getBoundingClientRect();
    const mouseY = e.clientY;
    const threshold = rect.height / 2;

    setDragOverBlock(blockId);
    setDragOverPosition(mouseY < rect.top + threshold ? 'top' : 'bottom');
  };

  const handleDrop = (e, targetBlockId) => {
    e.preventDefault();
    if (draggedBlock === targetBlockId) return;

    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const draggedIndex = newBlocks.findIndex(b => b.id === draggedBlock);
      const targetIndex = newBlocks.findIndex(b => b.id === targetBlockId);

      const [movedBlock] = newBlocks.splice(draggedIndex, 1);
      const insertIndex = dragOverPosition === 'top' ? targetIndex : targetIndex + 1;
      newBlocks.splice(insertIndex, 0, movedBlock);

      return newBlocks;
    });

    setDragOverBlock(null);
    setDragOverPosition(null);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
    setDragOverBlock(null);
    setDragOverPosition(null);
  };

  const handleImageUpload = (e, blockId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBlocks(blocks.map(block =>
          block.id === blockId ? { ...block, content: event.target.result } : block
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderBlock = (block) => {
    const blockType = blockTypes.find(t => t.id === block.type);
    const blockIndex = blocks.findIndex(b => b.id === block.id);
    const isOrderedList = block.type === 'ol';

    let startNumber = 1;
    if (isOrderedList) {
      let consecutiveCount = 1;
      for (let i = blockIndex - 1; i >= 0; i--) {
        if (blocks[i].type === 'ol') {
          consecutiveCount++;
        } else {
          break;
        }
      }
      startNumber = consecutiveCount;
    }


    const isDragging = draggedBlock === block.id;
    const isDragOver = dragOverBlock === block.id;
    const dragOverClass = isDragOver ? `drag-over-${dragOverPosition}` : '';



    return (
      <BlockContainer
        className={`${isDragging ? 'dragging' : ''} ${dragOverClass}`}
        draggable={false}
        onDragOver={(e) => handleDragOver(e, block.id)}
        onDrop={(e) => handleDrop(e, block.id)}
      >
        <BlockControls>
          <BlockTypeSelector>
            <BlockTypeButton
              onClick={() =>
                setActiveDropdown(activeDropdown === block.id ? null : block.id)
              }
            >
              +
            </BlockTypeButton>
            {activeDropdown === block.id && (
              <BlockTypeDropdown>
                {blockTypes.map(type => (
                  <BlockTypeOption
                    key={type.id}
                    onClick={() => changeBlockType(block.id, type.id)}
                  >
                    {type.label}
                  </BlockTypeOption>
                ))}
              </BlockTypeDropdown>
            )}
          </BlockTypeSelector>
          <DragHandle
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              handleDragStart(e, block.id);
              const blockElement = e.target.closest('.block-container');
              if (blockElement) {
                blockElement.draggable = true;
              }
            }}
            onDragEnd={(e) => {
              e.stopPropagation();
              handleDragEnd();
              const blockElement = e.target.closest('.block-container');
              if (blockElement) {
                blockElement.draggable = false;
              }
            }}
          >
            ⋮⋮
          </DragHandle>
        </BlockControls>
        <BlockContent>
          {block.type === 'text' && (
            <TextBlock
              data-placeholder="Type something..."
              ref={el => (blockRefs.current[block.id] = el)}
              contentEditable
              suppressContentEditableWarning
              onBlur={e => updateBlockContent(block.id, e.target.textContent)}
              onKeyDown={e => handleKeyDown(e, block.id, 'text')}
            >
              {block.content}
            </TextBlock>
          )}
          {block.type === 'h1' && (
            <Heading
              ref={el => (blockRefs.current[block.id] = el)}
              contentEditable
              suppressContentEditableWarning
              onBlur={e => updateBlockContent(block.id, e.target.textContent)}
              onKeyDown={e => handleKeyDown(e, block.id, 'h1')}
            >
              {block.content}
            </Heading>
          )}
          {block.type === 'ul' && (
            <List>
              <ListItem
                ref={el => (blockRefs.current[block.id] = el)}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => updateBlockContent(block.id, e.target.textContent)}
                onKeyDown={e => handleKeyDown(e, block.id, 'ul')}
              >
                {block.content}
              </ListItem>
            </List>
          )}
          {block.type === 'ol' && (
            <OrderedList start={startNumber}>
              <ListItem
                ref={el => (blockRefs.current[block.id] = el)}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => updateBlockContent(block.id, e.target.textContent)}
                onKeyDown={e => handleKeyDown(e, block.id, 'ol')}
              >
                {block.content}
              </ListItem>
            </OrderedList>
          )}
          {block.type === 'checkbox' && (
            <CheckboxBlock>
              <Checkbox
                type="checkbox"
                onChange={e => updateCheckbox(block.id, e.target.checked)}
                checked={block.checked}
              />
              <CheckboxText
                ref={el => (blockRefs.current[block.id] = el)}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => updateBlockContent(block.id, e.target.textContent)}
                onKeyDown={e => handleKeyDown(e, block.id, 'checkbox')}
              >
                {block.content}
              </CheckboxText>
            </CheckboxBlock>
          )}
          {block.type === 'image' && (
            <ImageBlock>
              {block.content ? (
                <ImageContainer>
                  <Image src={block.content} alt="Uploaded content" />
                  <RemoveImageButton
                    onClick={() => updateBlockContent(block.id, '')}
                  >
                    ×
                  </RemoveImageButton>
                </ImageContainer>
              ) : (
                <ImageUploadPlaceholder
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={async (e) => {
                      handleImageUpload(e, block.id)
                    }}
                  />
                  <UploadIcon>+</UploadIcon>
                  <UploadText>이미지 추가하기</UploadText>
                </ImageUploadPlaceholder>
              )}
            </ImageBlock>
          )}
        </BlockContent>
      </BlockContainer>
    );
  };

  return (
    <BlockEditorContainer>
      {blocks.map(block => (
        <Block key={block.id} >
          {/* <Block key={block.id} onChange={dispatch({type : 'POST',payload : {workspacename, foldername, filename, data : blocks}})}> */}
          {renderBlock(block)}
        </Block>
      ))}
    </BlockEditorContainer>
  );
};

export default BlockEditor;
