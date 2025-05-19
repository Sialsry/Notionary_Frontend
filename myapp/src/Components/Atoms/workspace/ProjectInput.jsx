import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import { addicon, doticon } from '../../../images'
import useModal from '../../../Hooks/useModal';
import Item from './Item';



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
    .itemwrap {
      width: 280px;
      height: 335.5px;
      border: 1px solid #D3D1CB;
      border-radius: 10px;
      box-shadow: 0 0 15px -12px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      z-index: 100;
    }

    .suggesttitle { 
      font-size: 14px;
      font-weight: 400;
      color: #7c7c7c;
      margin: 5px;
      display: inline-block;
      
    }
    
`
const ProjectInput = ({inputValue, icon, title}) => {
    const {OpenModal, ClosedModal, isOpen} = useModal();
    const Block = inputValue.textareavalue;
    const {textareaRef, setistitleFocused} = inputValue;
    console.log(Block,'asdff')
    return (<>
        {Block.map((el,index) => 
          <Projectwrap >
            <div className='Linecontent' >
              <img src={addicon} alt="" className='addbtn' onClick={OpenModal} />
              <img src={doticon} alt="" className='dotbtn'/> 
            </div>
              <textarea {...inputValue} 
              value={Block[index]}
              onFocus={() => setistitleFocused(false)} 
              ref={(el) => textareaRef.current[index] = el} 
              data-index={index} type="text" 
              key={index} />
              {isOpen ? <div className='itemwrap'>
                <div className='suggesttitle'>suggestions</div>
                 <Item icon={icon} title={title} Close={ClosedModal}/> 
              </div> : null }
            </Projectwrap>
            // icon.map((el, index) =>
            //   <div onClick={Close} >
            //     <img src={el ? el : ""} alt="" />
            //     <div className='itemtitle' >{title[index]}</div>
            //   </div>
            //   )
            )
          }
          </>
  )

}

export default ProjectInput
