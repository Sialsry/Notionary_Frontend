import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {saveData} from '../../../API/Workspaceapi';


const BlockEditorContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  /* padding: 20px; */
  /* padding-top: 50px; */
  height: 30px;
  border: 1px solid black;
  box-sizing: border-box;

`;
const TextBlock = styled.div`
  outline: none;
  /* padding: 0px 0; */
  font-size: 18px;
  line-height: 1.5;
  color: #333;
  width: 100%;
  text-align: left;
`;

const Ulist = styled.ul`
    margin : 0;
    padding-left: 24;
    width: calc(100% - 40px);
    height: 30px;

    /* text-align:  */
    
`

const Olist = styled.ol`
    margin: 0px;
    padding-left: 24px;
    width: calc(100% - 40px);
    height: 30px;
`

const List = styled.li`
     height: 30px;
     line-height: 1.5;

     &[contenteditable]:empty::before {
    content: attr(data-placeholder);
    color: #aaa;
    pointer-events: none;
    display: block;
  }
`


const NewBlock = () => {
    const [blocks, setBlocks] = useState([{ id: 0, type: 'text', content: '', checked: false },]);
    const blockRef = useRef({})
    const blockTypes = [
        { id: 'text', label: 'T 텍스트' },
        { id: 'h1', label: 'H1 제목' },
        { id: 'ul', label: '글머리 기호 목록' },
        { id: 'ol', label: '번호 매기기 목록' },
        { id: 'checkbox', label: '할 일 목록' },
        { id: 'image', label: '이미지' }
    ]


    useEffect(() => {
        saveData(blocks)
    }, [blocks])


    const addBlock = (type, currentId) => {
        const newBlock = {
            id: Date.now(),
            type,
            content: '',
            checked: false
        }
        setBlocks(prev => {
            const index = prev.findIndex(el => el.id === currentId)
            const newBlocks = [...prev];
            newBlocks.splice(index + 1, 0, newBlock);
            return newBlocks;
        })
        setTimeout(() => {
            const newEl = blockRef.current[newBlock.id];
            if (newEl) newEl.focus();
        }, 0)
    }
    const moveCursorToEnd = (el) => {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false); // move to end
        sel.removeAllRanges();
        sel.addRange(range);
    };

    const keydownHandler = (e, blockId, type) => {
        const index = blocks.findIndex(el => el.id === blockId)
        const currentEl = blockRef.current[blockId];
        const prevBlock = blocks[index - 1];
        const nextBlock = blocks[index + 1];
        const currentText = currentEl.textContent;
        if (!currentEl) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addBlock(type === 'image' ? 'h1' : type, blockId);
        } else if (e.key === 'Backspace' && currentText.trim() === '') {
            blockRef.current[prevBlock.id].focus();
            moveCursorToEnd(blockRef.current[prevBlock.id]);
            // const isAtStart = isCursorAtStart(currentEl);
            // if (isAtStart && index > 0) {
            //     e.preventDefault();
            //     if (!currentText || currentText.trim() === '') {
            //         setBlocks(prev => prev.filter((_, i) => i !== index));
            //         setTimeout(() => {
            //             const prevEl = blockRef.current[prevBlock.id];
            //             if (prevEl) {
            //                 prevEl.focus();
            //                 moveCursorToEnd(prevEl)
            //             }
            //         }, 0)
            //     } else {
            //         const prevEl = blockRef.current[prevBlock.id];
            //         if (prevEl) {
            //             prevEl.focus();
            //             moveCursorToEnd(prevEl);
            //         }
            //     }
            // }
        }
    }

    const renderBlock = (block) => {
        const blockIndex = blocks.findIndex(el => el.id === block.id)
        let listNumber = 1;

        if (block.type === 'ol') {
            let count = 1;
            for (let i = blockIndex; i >= 0; i--) {
                if (blocks[i].type === 'ol') {
                    count++
                }
                else {
                    break;
                }

            }
            listNumber = count
        }
        return (<>

            {/* <TextBlock
                      contentEditable
                      suppressContentEditableWarning
                    >
            </TextBlock> */}
            {/* <Ulist>
                <List contentEditable
                suppressContentEditableWarning>

                </List>
            </Ulist> */}
            <Olist>
                <List contentEditable
                    suppressContentEditableWarning
                    ref={el => (blockRef.current[block.id] = el)}
                    onKeyDown={e => keydownHandler(e, block.id, 'text')}
                    data-placeholder="Type something..."
                >
                </List>
            </Olist>
        </>
        )
    }
    return (
        <BlockEditorContainer >
            {blocks.map(el => (
                <>
                    {renderBlock(el)}
                </>
            ))}
        </BlockEditorContainer>
    )
}

export default NewBlock