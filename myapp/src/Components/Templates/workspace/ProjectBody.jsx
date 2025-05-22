// import React, {useState} from 'react'
// import styled from 'styled-components'
// import ProjectContent from '../Molecules/workspace/ProjectContent'
// import TitleInput from '../Atoms/workspace/TitleInput'
// import useProjectinput from '../../Hooks/workspace/useProjectinput'
// import Selectitem from '../Molecules/workspace/Selectitem'
// import useModal from '../../Hooks/useModal'



// const WorkspaceBody = styled.div`
//     width: 1665px;
//     padding-top: 112px;
//     padding-bottom: 250px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     float: right;
//     position: relative;
//     align-items: center;

//     .bodyContent {
//         padding-top: 5px;
//     }

// `




// const ProjectBody = () => {
//     const {isOpen, ClosedModal} = useModal();
//     const ProjectinputValue = useProjectinput();
//     return (
//         <WorkspaceBody>
//             <TitleInput titleHandler={ProjectinputValue}/>
//             <div className='bodyContent'>
//                 <div className='Linecontent'>
//                     {/* {!isOpen ?
//                     <img src={addicon} alt="" className='addbtn' onClick={OpenModal} /> : null}
//                     {!isOpen ?
//                     <img src={doticon} alt="" className='dotbtn'/> : null
//                     } */}
//                     <ProjectContent inputValue={ProjectinputValue}/>
//                 </div>
//             </div>
//             <div className='itemwrap'>
//                 {isOpen ? <Selectitem Close={ClosedModal} /> : null}
//             </div>
//         </WorkspaceBody>
//     )
// }

// export default ProjectBody
