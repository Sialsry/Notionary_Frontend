import React from 'react'
import styled from 'styled-components'
import ProjectContent from '../Molecules/ProjectContent'
import TitleInput from '../Atoms/TitleInput'


const WorkspaceBody = styled.div`
    /* div{
        width: 224px;
        height: 100vh;
        background-color: #bdbdbd;
        position: fixed;
    } */
    margin-top: 112px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .bodyContent {
        padding-top: 5px;
    }
`




const ProjectBody = () => {
  return (
    <WorkspaceBody>
        <TitleInput />
        <div className='bodyContent'>
            <ProjectContent />
            <ProjectContent />
        </div>
    </WorkspaceBody>
  )
}

export default ProjectBody
