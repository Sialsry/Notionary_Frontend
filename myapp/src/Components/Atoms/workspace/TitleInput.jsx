import React from 'react'
import styled from 'styled-components'

const Titlewrap = styled.div`
    width: 770px;

    textarea {
        width: ${({width}) => width ? width : '709.99px'};
        height:  ${({height}) => height ? height : '50.99px'};
        padding: 3px 2px;
        box-sizing: border-box;
        border : 1px solid #c7c7c7;
        outline: none;
        font-size: 40px;
        white-space: pre-wrap;
        overflow : hidden;
        resize: none;
        display: block;
        margin-left: 58px;
    }
`
const TitleInput = ({titleHandler}) => {
  const {titleRef, setistitleFocused} = titleHandler;
  const Block = titleHandler.titlevalue;
  console.log(typeof (Block),Block, 'bbb')
  return (
    <Titlewrap>
      {Block.map((el,index) => <textarea type="text" {...titleHandler} 
      key={index}
      onFocus={() => setistitleFocused(true)}  
      ref={(el) => titleRef.current[index] = el} 
      data-index={index}/>)}
    </Titlewrap>
  )
}

export default TitleInput
