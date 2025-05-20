import React from 'react'
import styled from 'styled-components'

const Textareawrap = styled.div`
      textarea{
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
`

const Textarea = ({inputValue, textareaRef, Block, index, setistitleFocused}) => {
  return (
    <Textareawrap>
      <textarea {...inputValue} 
            value={Block[index]}
            onFocus={() => setistitleFocused(false)} 
            ref={(el) => textareaRef.current[index] = el} 
            data-index={index} type="text" 
            key={index} />
    </Textareawrap>
  )
}

export default Textarea
