import React, { useEffect } from 'react'
import styled from 'styled-components'
import { toggle } from '../../../../images'

const Contentwrap = styled.div`
        
        width: 715.99px;
        /* height: ${({ height }) => height ? height : "29.98px"}; */
        
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

/*        
        textarea {
            display: flex;
            align-items: center;
            width: 600px;
            font-size: ${({ size }) => size ? size : '22px'};
            height: ${({ height }) => height || '27.98px'};
            font-size: ${({ size }) => size ? size : '16px'};
            width: ${({ width }) => width ? width : "690.99px"};
            font-weight: ${({ Weight }) => Weight ? Weight : null};
            box-sizing: border-box;
            resize: none;
            white-space: pre-wrap;
        } */
                
        img {
            height: 13px;
            width : 20px;
        }
        ol, ul {
            margin: 0;
        }
`
const Area = styled.textarea`
     display: flex;
            align-items: center;
            width: 600px;
            font-size: ${({ size }) => size ? size : '22px'};
            height: ${({ height }) => height || '27.98px'};
            /* font-size: ${({ size }) => size ? size : '16px'};
            /* width: ${({ width }) => width ? width : "690.99px"}; */
            /* font-weight: ${({ Weight }) => Weight ? Weight : null};
            box-sizing: border-box;
            resize: none;
            white-space: pre-wrap; */
`

const Textarea = ({ ProjectInput}) => {
    console.log(ProjectInput,'asdfdfdfd')
    const Content = ProjectInput.contentvalue;
    const setContent = ProjectInput.setContentValue;
    console.log(Content,'asdlfasdf')
    const valueHandler = (e, index) => {
        const Block = [...Content]
        console.log(Block,'aa')
        Block[index].content = e.target.value; 
        
        setContent(Block)
    }
    // class inputValue{
    //     constructor(fontsize, content, fontweight, type, height){
    //         this.fontsize = fontsize || null;
    //         this.content = content || null;
    //         this.fontweight = fontweight || null;
    //         this.type = type || null;
    //         this.height = height || null;
    //     }
    //     updateValue() {

    //     }
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
                                <Area key={index} 
                                type="text" 
                                value={el.content} 
                                onChange={(e) => valueHandler(e, index)}
                                height={el.height} ></Area>
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
                                <Area key={index} 
                                size={el.fontsize}
                                onChange={(e) => valueHandler(e, index)}
                                type="text" value={el.content}></Area>
                            </Contentwrap>
                        )
                    case "bulleted list":
                        return (
                            <Contentwrap
                                // key={index}
                                // height={el.height}
                                // weight={el.fontweight}
                                // size={el.fontsize}
                                // width={'650px'}>
                                // <ul >
                                //     <li > <Area 
                                //     key={index}
                                //     onChange={(e) => valueHandler(e, index)}
                                //     type="text" value={el.content}></Area></li>
                                // </ul>
                                key={index}
                                weight={el.fontweight}
                                width={'650px'}>
                                <ul >
                                    <li ><Area key={index} 
                                    size={el.fontsize}
                                    onChange={(e) => valueHandler(e, index)}
                                    type="text" value={el.content}></Area></li>
                                </ul>
                            </Contentwrap>
                        )

                    case "ordered list":
                        return (
                            <Contentwrap key={index}
                                weight={el.fontweight}
                                width={'650px'}>
                                <ol >
                                    {
                                    <li ><Area key={index} 
                                    size={el.fontsize}
                                    onChange={(e) => valueHandler(e, index)}
                                    type="text" value={el.content}></Area></li>
                                    }
                                </ol>
                            </Contentwrap>
                        )
                    case "checkbox":
                        return (<div className='CheckBox'>
                            <Contentwrap width={'695px'}>
                                <input type='checkbox' />
                                <Area key={index} 
                                size={el.fontsize}
                                onChange={(e) => valueHandler(e, index)}
                                type="text" value={el.content} ></Area>
                            </Contentwrap>
                        </div>
                        )
                    case "toggle":
                        return (
                            <Contentwrap>

                                <img src="toggle" alt="" />
                                <Area key={index} 
                                onChange={(e) => valueHandler(e, index)}
                                value={el.content}></Area>
                            </Contentwrap>
                            // <Contentwrap width={'695px'} key={index}
                            //     height={el.height}
                            //     weight={el.fontweight}
                            //     size={el.fontsize}>
                            //     <img src="toggle" alt="" />
                            //     <Area type="text" value={el.content} ></Area>
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
                            // <Contentwrap>
                            //     <Area key={index}
                            //     onChange={(e) => valueHandler(e, index)}
                            //     value={el.content}></Area>
                            // </Contentwrap>
                            <Contentwrap >
                                
                            </Contentwrap>
                        )
                    }
                    
                }
            })
        }
    </>)
}

export default Textarea
