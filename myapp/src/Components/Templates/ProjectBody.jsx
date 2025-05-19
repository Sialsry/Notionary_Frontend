import React from 'react'
import styled from 'styled-components'
import ProjectContent from '../Molecules/workspace/ProjectContent'
import TitleInput from '../Atoms/workspace/TitleInput'
import useProjectinput from '../../Hooks/workspace/useProjectinput'
import useKeydownTitleHandler from '../../Hooks/workspace/useTitleinput'
import addbtn from '../../images/icons/addicon.png'
import dotbtn from '../../images/icons/doticon.png'
import Selectitem from '../Molecules/workspace/Selectitem'
import { addicon, doticon } from '../../images'
import useModal from '../../Hooks/useModal'


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
    position: relative;
    align-items: center;

    .bodyContent {
        padding-top: 5px;
    }
    .Linecontent {

    }
    /* .addbtn {
        width: 30x;
        position:absolute;
        left: 400px;
    }
    .dotbtn {
        width: 27px;
        position:absolute;
        left: 430px;
    } */
    .itemwrap.active {
    }
    .itemwrap {
        width: 709.99px;
        display: flex;
        justify-content: flex-start
    }
`




const ProjectBody = () => {
    const {isOpen, isVisible, OpenModal, ClosedModal} = useModal();
    const ProjectinputValue = useProjectinput();
    const TitleHandler = useKeydownTitleHandler();
    return (
        <WorkspaceBody>
            <TitleInput titleHandler={ProjectinputValue}/>
            <div className='bodyContent'>
                <div className='Linecontent'>
                    {/* {!isOpen ?
                    <img src={addicon} alt="" className='addbtn' onClick={OpenModal} /> : null}
                    {!isOpen ?
                    <img src={doticon} alt="" className='dotbtn'/> : null
                    } */}
                    <ProjectContent inputValue={ProjectinputValue}/>
                </div>
            </div>
            <div className='itemwrap'>
                {isOpen ? <Selectitem Close={ClosedModal} /> : null}
            </div>
        </WorkspaceBody>
    )
}

export default ProjectBody
