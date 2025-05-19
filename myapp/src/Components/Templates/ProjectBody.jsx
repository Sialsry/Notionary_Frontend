import React from 'react'
import styled from 'styled-components'
import ProjectContent from '../Molecules/ProjectContent'
import TitleInput from '../Atoms/workspace/TitleInput'
import useProjectinput from '../../Hooks/workspace/useProjectinput'
import useKeydownTitleHandler from '../../Hooks/workspace/useTitleinput'
import addbtn from '../../images/icons/addicon.png'
import dotbtn from '../../images/icons/doticon.png'
import Selectitem from '../Molecules/Selectitem'
import { addicon, doticon } from '../../images'

const WorkspaceBody = styled.div`
    /* div{
        width: 224px;
        height: 100vh;
        background-color: #bdbdbd;
        position: fixed;
    } */
    width: 1665px;
    padding-top: 112px;
    display: flex;
    flex-direction: column;
    align-items: center;
    float: right;
    position: relative;
    align-items: center;

    .bodyContent {
        padding-top: 5px;
    }
    .Linecontent {

    }
    .addbtn {
        width: 30x;
        position:absolute;
        left: 400px;
    }
    .dotbtn {
        width: 27px;
        position:absolute;
        left: 430px;
    }
    .itemwrap.active {
    }
    .itemwrap {
        width: 709.99px;
        display: none;
        justify-content: flex-start
    }
`




const ProjectBody = () => {
    const ProjectinputValue = useProjectinput();
    const TitleHandler = useKeydownTitleHandler();
    return (
        <WorkspaceBody>
            <TitleInput titleHandler={ProjectinputValue}/>
            <div className='bodyContent'>
                <div className='Linecontent'>
                    <img src={addicon} alt="" className='addbtn' onClick={isactive} />
                    <img src={doticon} alt="" className='dotbtn'/>
                    <ProjectContent inputValue={ProjectinputValue}/>
                </div>
            </div>
            <div className='itemwrap'>
                <Selectitem/>
            </div>
        </WorkspaceBody>
    )
}

export default ProjectBody
