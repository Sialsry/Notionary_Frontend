import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import { addicon, doticon } from '../../../images'
import useModal from '../../../Hooks/useModal';



const Projectwrap = styled.div`
    & {
      /* position:relative; */
      
    }
    textarea {
        width: 709.99px;
        height: 28px;
        min-height: 29.99px;
        padding: 3px 2px;
        box-sizing: border-box;
        border : 1px solid #c7c7c7;
        outline: none;
        font-size: 16px;
        white-space: pre-wrap;
        overflow : hidden;
        resize: none;
        display: block;
        /* position: relative; */
    }
    .addbtn {
      width: 30px;
      position:absolute;
      left: -70px;
    }
    .dotbtn {
        width: 30px;
        position:absolute;
        left: -40px;
    }
    .Linecontent{
      /* position: absolute; */
      /* left:  */
    }
`
const ProjectInput = ({inputValue, icon, title}) => {
    const {OpenModal, ClosedModal, isOpen} = useModal();
    const Block = inputValue.textareavalue;
    const {textareaRef, setIstitlefocused} = inputValue;
    console.log(Block,'asdff')
    return (<>
        {Block.map((el,index) => 
          <Projectwrap >
            <div className='Linecontent' >
              <img src={addicon} alt="" className='addbtn' onClick={OpenModal} />
              <img src={doticon} alt="" className='dotbtn'/> 
            </div>
              <textarea {...inputValue} 
              onFocus={() => setIstitlefocused(false)} 
              ref={(el) => textareaRef.current[index] = el} 
              data-index={index} type="text" 
              key={index} />
            </Projectwrap>
            icon.map((el, index) =>
              <div onClick={Close} >
                <img src={el ? el : ""} alt="" />
                <div className='itemtitle' >{title[index]}</div>
              </div>
              )
            )
          }
          </>
  )

}

export default ProjectInput
