import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';



const Projectwrap = styled.div`
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
    }
`
const ProjectInput = ({inputValue}) => {
    const Block = inputValue.textareavalue;
    const {textareaRef, setIstitlefocused} = inputValue;
    console.log(Block,'asdff')
    return (
      <Projectwrap >
        {Block.map((el,index) => <textarea {...inputValue} 
        onFocus={() => setIstitlefocused(false)} 
        ref={(el) => textareaRef.current[index] = el} 
        data-index={index} type="text" 
        key={index} />)}
      </Projectwrap>
  )

}

export default ProjectInput
