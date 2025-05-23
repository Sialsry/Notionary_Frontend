import React, { useEffect } from 'react'
import styled from 'styled-components'
import { toggle } from '../../../images'
import ResizableTable from './table'

const Contentwrap = styled.div`
        
        width: 709.99px;
        height: ${({ height }) => height ? height : "29.98px"};
        padding: 3px 2px;
        box-sizing: border-box;
        border : 1px solid #c7c7c7;
        outline: none;
        font-size: 16px;
        white-space: pre-wrap;
        overflow : hidden;
        resize: none;
        display: flex;
        align-items: center;
        /* font-size: ${({ size }) => size ? size : '12px'};
        font-weight: ${({ Weight }) => Weight ? Weight : null}; */
        /* margin-left: 60px; */
        /* position: absolute; */

        .CheckBox {
            display: flex;
        }
        textarea {
            width: ${({ width }) => width ? width : "709.99px"};
            font-size: ${({ size }) => size ? size : '16px'};
            font-weight: ${({ Weight }) => Weight ? Weight : null};
            height: ${({ height }) => height || '29.98px'};
            box-sizing: border-box;
            resize: none;
        }
   
        ul, ol {
            /* margin: 0; */
            display: flex;
            align-items: center;
        }
        img {
            /* height: 13px; */
            width : 20px;
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
                const type = el.type;
                console.log(el.type, el.content, el.fontsize, 'ss')
                switch (type) {

                    case "header1":
                        return (
                            <Contentwrap
                                key={index}
                                // onChange={(e) => valueHandler(e, index)} 
                                height={el.height}
                                Weight={el.fontweight}
                                size={el.fontsize} >
                                <textarea type="text" value={el.content} height={el.height} ></textarea>
                            </Contentwrap>
                        )
                    case "header2":
                        return (
                            <Contentwrap
                                key={index}
                                // onChange={(e) => valueHandler(e, index)} 
                                height={el.height}
                                Weight={el.fontweight}
                                size={el.fontsize} >
                                <textarea type="text" value={el.content}></textarea>
                            </Contentwrap>
                        )
                    case "bulleted list":
                        return (
                            <Contentwrap
                                key={index}
                                height={el.height}
                                weight={el.fontweight}
                                size={el.fontsize}
                                width={'650px'}>
                                <ul >
                                    <li > <textarea type="text" value={el.content}></textarea></li>
                                </ul>
                            </Contentwrap>
                        )

                    case "ordered list":
                        return (
                            <Contentwrap key={index}
                                height={el.height}
                                weight={el.fontweight}
                                size={el.fontsize}>
                                <ol >
                                    <li ><textarea type="text" value={el.content}></textarea></li>
                                </ol>
                            </Contentwrap>
                        )
                    case "checkbox":
                        return (<div className='CheckBox'>
                            <Contentwrap width={'695px'}>
                                <input type='checkbox' />
                                <textarea type="text" value={el.content} ></textarea>
                            </Contentwrap>
                        </div>
                        )
                    case "toggle":
                        return (
                            <Contentwrap>

                                <img src="toggle" alt="" />
                                <textarea value={el.content}></textarea>
                            </Contentwrap>
                            // <Contentwrap width={'695px'} key={index}
                            //     height={el.height}
                            //     weight={el.fontweight}
                            //     size={el.fontsize}>
                            //     <img src="toggle" alt="" />
                            //     <textarea type="text" value={el.content} ></textarea>
                            // </Contentwrap>
                        )
                    // case "table":
                    //     return (
                    //         <Contentwrap width={'695px'} key={index}
                    //             height={el.height}
                    //             weight={el.fontweight}
                    //             size={el.fontsize}>
                    //             <ResizableTable />
                    //         </Contentwrap>
                    //     )
                    default: {
                        return (
                            <Contentwrap>
                                <textarea value={el.content}></textarea>
                            </Contentwrap>
                        )
                    }
                    
                }
            })
        }
    </>)
}

export default Textarea
