import React, { useEffect } from 'react'
import styled from 'styled-components'

const Textareawrap = styled.textarea`
      
        width: 709.99px;
        height: ${({ height }) => height ? height : "28px"};
        padding: 3px 2px;
        box-sizing: border-box;
        border : 1px solid #c7c7c7;
        outline: none;
        font-size: 16px;
        white-space: pre-wrap;
        overflow : hidden;
        resize: none;
        display: block;
        font-size: ${({ size }) => size ? size : '12px'};
        font-weight: ${({ Weight }) => Weight ? Weight : null};
        /* margin-left: 60px; */
        /* position: absolute; */

        & .span {
            content: '';
            display: inline-block;
            width: 3px;
            height: 3px;
            border-radius: 3px;
        }
      
`

const Textarea = ({ Content, setContent }) => {
    // const valueHandler = (e, index) => {
    //     const Block = [{...Content}]
    //     Block[index].content = e.target.value; 
        
    //     setContent(Block)
    // }
    useEffect(() => {
        console.log(Content)
    }, [Content])
    return (<>
    {
        Content.map((el, index) => {
            console.log(el.type,el.content,el.fontsize,'ss')
            if (el.type === "header")
                return (
                    <Textareawrap 
                    key={index}
                    // onChange={(e) => valueHandler(e, index)} 
                    height={el.height} 
                    Weight={el.fontweight} 
                    value={el.content} 
                    size={el.fontsize} />
                )
            if (el.type === "bulleted list")
                return (
                    <Textareawrap 
                    key={index}
                    value={el.content} 
                    height={el.height}
                    weight={el.fontweight} 
                    size={el.fontsize}>
                        <ul>
                            <li></li>
                        </ul>
                    </Textareawrap>
                )
            else {
                return (
                    <Textareawrap value={el.content} />
                )
                
            }
            // if(type === "header")
            // return (
            //     <Textareawrap height={height} fontweight={fontweight}>
            //     <textarea value={content} />
            //     </Textareawrap>
            // )
            // if(type === "header")
            // return (
            //     <Textareawrap height={height} fontweight={fontweight}>
            //     <textarea value={content} />
            //     </Textareawrap>
            // )
        })
    }
</>)
}

export default Textarea
