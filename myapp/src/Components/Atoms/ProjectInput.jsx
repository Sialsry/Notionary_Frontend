import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';



const Projectwrap = styled.div`
    textarea {
        width: 709.99px;
        min-height: 29.99px;
        padding: 3px 2px;
        box-sizing: border-box;
        border : 1px solid #c7c7c7;
        outline: none;
        font-size: 16px;
        white-space: pre-wrap;
        overflow : hidden;
        resize: none;
    }
`
const ProjectInput = () => {
  const textareaRef = useRef(null);
  const [value, setValue] = useState('');
  console.log(textareaRef,'aaa')
  const handleInput =(e) => {
    setValue(e.target.value)
  }
  const resizearea = () => {
    const textarea = textareaRef.current;
    if(textarea) {
      // textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  
  useEffect(() => {
    resizearea()
  }, [value])
  

    return (
      <Projectwrap >
      <textarea type="text" ref={textareaRef} onChange={handleInput} value={value} />
    </Projectwrap>
  )

}

export default ProjectInput
