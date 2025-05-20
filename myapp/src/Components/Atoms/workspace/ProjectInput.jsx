import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import { addicon, doticon } from '../../../images'
import useModal from '../../../Hooks/useModal';
import Item from './Item';



const Projectwrap = styled.div`
    position: relative;
    width: 790px;
    display: flex;

    &:hover .addbtn, &:hover .dotbtn {
      /* position:relative; */
      display: inline-block;
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
        /* margin-left: 60px; */
        box-sizing:border-box;
        /* position: absolute; */
        
    }
    .addbtn {
      width: 30px;
      height: 30px;
     display:none;
    }
    .dotbtn {
        width: 30px;
        height: 30px;
        display: none;
    }
    .Linecontent{
      width : 60px;
      padding: 0 5px;
      display: flex;
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
    .Items {
      width: 280px;
      height: 300px;
      border: 1px solid #dfdfdf;
      border-radius: 10px;
      position: absolute;
      left: 70px;
      top: 30px;
      z-index: 100;
      box-shadow: 0 0 15px -15px;
      background-color: #FFFF;
      padding: 10px;
      /* display: none; */

    }
    .Itemwrap:hover {
       
      background-color: #dfdfdf;
      border-radius: 5px;
      user-select: none
    }
    .Itemwrap {
      width: 280px;
      height: 32px;
      display: flex;
      align-items: center;
    }
    .Itemwrap img {
          height: 20px;
          box-sizing: border-box;
          margin-right: 10px;
     }
    
`
const ProjectInput = ({inputValue, icon, title}) => {
    const Block = inputValue.textareavalue;
    const [isOpen, setIsOpen] = useState(new Array(Block.length).fill("false"));
    const {textareaRef, setistitleFocused} = inputValue;
  

    return (<>
        {Block.map((el,index) => 
          <Projectwrap key={index}>
            {/* {isOpen[index]} */}
            <div className='Linecontent' >
              <img src={addicon} alt="" className='addbtn' onClick={() => {
                const isOpen = new Array(Block.length).fill("false")
                isOpen[index] = "true"
                console.log("123")
                setIsOpen([...isOpen])}
            } />
              <img src={doticon} alt="" className='dotbtn'/> 
            </div>
              <textarea {...inputValue} 
              value={Block[index]}
              onFocus={() => setistitleFocused(false)} 
              ref={(el) => textareaRef.current[index] = el} 
              data-index={index} type="text" 
              key={index} />
              {isOpen[index] == "true" ? 
              <div className='Items'>
                <div className='suggesttitle'>suggestions</div>
                {icon.map((el, index) =>
                  <div key={index} className='Itemwrap' onClick={() => {
                      // isOpen[index] = "false"
                      setIsOpen(new Array(Block.length).fill("false"))}
                  } >
                    <img src={el ? el : "a"} alt="" />
                    <div className='itemtitle' >{title[index]}</div>
                  </div>
                  )} 
                </div> : null }
            </Projectwrap>
            )
          }
          </>
  )

}

export default ProjectInput
