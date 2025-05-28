// import React, { useEffect, useRef, useState } from 'react'
// import styled from 'styled-components'
// import { header, bulletlist, numberlist, todolist, togglelist, image } from '../../../images'
// import Addcontent from '../../Atoms/newworkspace/workspacepage/Addcontent'


// const Contentwrap = styled.div`
//     position: relative;
//     width: 780px;
//     display: flex;
//     position:relative;

//     &:hover .Addcontentbody {
//       display: flex;
//     }
//     .Addcontentbody{
//       display: none;
//     }
//     .Addcontent {
//       width: 58px;
//       padding-left: 5px;
//     }
//     .Items {
//       width: 280px;
//       height: 300px;
//       border: 1px solid #dfdfdf;
//       border-radius: 10px;
//       position: absolute;
//       left: 62px;
//       top: 30px;
//       z-index: 100;
//       box-shadow: 0 0 15px -15px;
//       background-color: #FFFF;
//       padding: 10px;
//       display: none;
//       &.true {
//         display : block;
//       }
//     }

//     span {
//       position: absolute;
//     }
// `

// const ProjectContent = ({ inputValue }) => {

//     const icon = [header, bulletlist, numberlist, todolist, togglelist, image]
//     const icontitle = ['header', 'bulleted list', 'numbered list', 'todo list', 'toggle list', 'image']

//     return (<>
//         {Block.map((el, index) =>
//             <Contentwrap key={index}>
//                 <div className='Addcontent'>
//                    <Addcontent />
//                 </div>
//                 <Textarea
                 
//                 />

//                 <div >
//                     <Item 
//                     />
//                 </div>
//             </Contentwrap>
//         )}
//     </>
//     )
// }

// export default ProjectContent
