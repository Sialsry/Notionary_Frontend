import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { header, bulletlist, numberlist, todolist, togglelist, image } from '../../../images'
import Addcontent from '../../Atoms/workspace/Addcontent'
import Textarea from '../../Atoms/workspace/Textarea'
import Item from '../../Atoms/workspace/Item'
import useSelecttitle from '../../../Hooks/workspace/useSelecttitle'

const Contentwrap = styled.div`
    position: relative;
    width: 780px;
    display: flex;
    position:relative;

    &:hover .Addcontentbody {
      display: flex;
    }
    .Addcontentbody{
      display: none;
    }
    .Addcontent {
      width: 58px;
      padding-left: 5px;
    }
    .Items {
      width: 280px;
      height: 300px;
      border: 1px solid #dfdfdf;
      border-radius: 10px;
      position: absolute;
      left: 62px;
      top: 30px;
      z-index: 100;
      box-shadow: 0 0 15px -15px;
      background-color: #FFFF;
      padding: 10px;
      display: none;
      &.true {
        display : block;
      }
    }

    span {
      position: absolute;
    }
`

const ProjectContent = ({ inputValue }) => {
    const { selecttitle, setSelecttitle } = useSelecttitle();
    const Block = inputValue.textareavalue;
    const itemsRef = useRef()
    const [itemactive, setitemactive] = useState("false")
    const [isOpen, setIsOpen] = useState(new Array(Block.length).fill("false"));
    const { textareaRef, setistitleFocused } = inputValue;
    const icon = [header, bulletlist, numberlist, todolist, togglelist, image]
    const icontitle = ['header', 'bulleted list', 'numbered list', 'todo list', 'toggle list', 'image']

    return (<>
        {Block.map((el, index) =>
            <Contentwrap key={index}>
                <div className='Addcontent'>
                    {itemactive === "false" ?
                        <div className='Addcontentbody'>
                            <Addcontent />
                        </div> : null}
                </div>
                <Textarea
                    key={index}
                    inputValue={inputValue}
                    textareaRef={textareaRef}
                    title={icontitle}
                    Block={Block}
                    index={index}
                    setistitleFocused={setistitleFocused}
                />

                <div className={`Items ${isOpen[index]}`} ref={(el) => (itemsRef.current = el)}>
                    <Item setIsOpen={setIsOpen}
                        icon={icon}
                        title={icontitle}
                        Block={Block}
                        setitemactive={setitemactive}
                        setSelecttitle={setSelecttitle}
                    />
                </div>
            </Contentwrap>
        )}
    </>
    )
}

export default ProjectContent
