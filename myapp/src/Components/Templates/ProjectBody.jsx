import React from 'react'
import styled from 'styled-components'
import ProjectContent from '../Molecules/ProjectContent'
import TitleInput from '../Atoms/TitleInput'
import useProjectinput from '../../Hooks/useProjectinput'
import useKeydownTitleHandler from '../../Hooks/useTitleinput'



const WorkspaceBody = styled.div`
    /* div{
        width: 224px;
        height: 100vh;
        background-color: #bdbdbd;
        position: fixed;
    } */
    width: 1665px;
    padding-top: 112px;
    padding-bottom: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    float: right;
    .bodyContent {
        padding-top: 5px;
    }
`




const ProjectBody = () => {
    const ProjectinputValue = useProjectinput();
    const TitleHandler = useKeydownTitleHandler();
    return (
        <WorkspaceBody>
            <TitleInput titleHandler={ProjectinputValue}/>
            <div className='bodyContent'>
                <ProjectContent inputValue={ProjectinputValue}/>
            </div>
        </WorkspaceBody>
    )
}

export default ProjectBody
