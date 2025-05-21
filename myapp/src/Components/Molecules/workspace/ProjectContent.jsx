import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ProjectInput from '../../Atoms/workspace/ProjectInput'
import { header, bulletlist, numberlist, todolist, togglelist, image } from '../../../images'
import Addcontent from '../../Atoms/workspace/Addcontent'
import Textarea from '../../Atoms/workspace/Textarea'
import Item from '../../Atoms/workspace/Item'
import MyEditor from '../../Atoms/workspace/tiptap'
import TiptapEditor from '../../Atoms/workspace/tiptap'


const Contentwrap = styled.div`
    position: relative;
    width: 780px;
    height: 29.98px;
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
      /* box-sizing: border-box; */
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
      /* right: ; */
    }
`

const ProjectContent = ({inputValue}) => {
    const Block = inputValue.textareavalue;
    const itemsRef = useRef()
    const [itemactive, setitemactive] = useState("false")
    const [isOpen, setIsOpen] = useState(new Array(Block.length).fill("false"));
    const {textareaRef, setistitleFocused} = inputValue;
    const icon = [header, bulletlist, numberlist, todolist, togglelist, image]
    const icontitle = ['header', 'bulleted list', 'numbered list', 'todo list', 'toggle list', 'image']

    // useEffect(() => {
    //   const itemsrefHandler = (e) => {
    //     console.log(e.target)
    //     if(e.target.className != "itemtitle") 
    //       setitemactive("false")
    //       setIsOpen(new Array(Block.length).fill("false"))
    //     } 
        
    //     document.addEventListener("mousedown", itemsrefHandler);
    //     // return () => {
      //     //   document.removeEventListener("mousedown", itemsrefHandler);
      //     // };
      
      // }, [])
      
      return (<>
        {/* <TiptapEditor /> */}
      {Block.map((el,index) => 
      <Contentwrap key={index}>
        <div className='Addcontent'>
        {itemactive === "false" ?
          <div className='Addcontentbody'>
            <Addcontent 
              setitemactive={setitemactive}
              setIsOpen={setIsOpen} 
              isOpen={isOpen} 
              Block={Block} 
              index={index} />
            </div> : null }
        </div>
        <div className='Textarea'>
          <TiptapEditor
            inputValue={inputValue} 
            textareaRef={textareaRef} 
            title={icontitle}
            Block={Block}
            index={index}
            setistitleFocused={setistitleFocused}
          />
        </div>
        <div className={`Items ${isOpen[index]}`} ref={(el) => (itemsRef.current = el)}>
              <Item setIsOpen={setIsOpen} 
              icon={icon} 
              title={icontitle} 
              Block={Block} 
              setitemactive={setitemactive}
              />
        </div>
      </Contentwrap>
      )}
    </>
  )
}
// const ProjectContent = ({inputValue}) => {
//     const icon = [header, bulletlist, numberlist, todolist, togglelist, image]
//     const icontitle = ['header', 'bullet list', 'numbered list', 'todo list', 'toggle list', 'image']
//   return (
//     <Contentwrap>
//        <ProjectInput inputValue={inputValue} icon={icon} title={icontitle} />
//     </Contentwrap>
//   )
// }

export default ProjectContent
