import React, {useState} from 'react'
import styled from 'styled-components'
import Textarea from '../../Atoms/newworkspace/workspacepage/Textarea'
import useProjectinput from '../../../Hooks/newworkspace/useProjectinput'
import Item from '../../Atoms/newworkspace/workspacepage/Item'
import { header, bulletlist, numberlist, todolist, togglelist, image } from '../../../images'
import Addcontent from '../../Atoms/newworkspace/workspacepage/Addcontent'





const WorkspaceBody = styled.div`
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
`


const ProjectBody = () => {
    const [Content, setContent] = useState([
        {fontsize : '24px', content : '', fontweight : '600', type : 'header1' , height : '29px'},
        {fontsize : '24px', content : '', fontweight : '600', type : 'bulleted list' , height : '29px'},
        {fontsize : '24px', content : '', fontweight : '600', type : 'bulleted list' , height : '29px'},
        {fontsize : '24px', content : '', fontweight : '600', type : 'bulleted list' , height : '29px'},
        {fontsize : '24px', content : '', fontweight : '600', type : 'header2' , height : '29px'},
        {fontsize : '32px', content : '', fontweight : '600', type : 'header1' , height : '29px'},
        {fontsize : '24px', content : '', fontweight : '600', type : 'ordered list' , height : '29.9px'},
        {fontsize : '24px', content : '', fontweight : '600', type : 'ordered list' , height : '29.9px'},
        {fontsize : '24px', content : '', fontweight : '600', type : 'ordered list' , height : '29.9px'},
        {fontsize : '28px', content : '', fontweight : '600', type : 'checkbox' , height : '29px'},
        {fontsize : '24px', content : '', fontweight : '600', type : 'toggle' , height : '29px'},
        {fontsize : '24px', content : '', fontweight : '600', type : 'table' , height : '200px'},
    ])
    const icon = [header, bulletlist, numberlist, todolist, togglelist, image]
    const icontitle = ['header', 'bulleted list', 'numbered list', 'todo list', 'toggle list', 'image']
    const ProjectInput = useProjectinput();
    console.log(ProjectInput)

    return (
        <WorkspaceBody>
            <Addcontent />
           <Textarea ProjectInput={ProjectInput}  />
           <Item icon={icon} title={icontitle} />
        </WorkspaceBody>
    )
}

export default ProjectBody
