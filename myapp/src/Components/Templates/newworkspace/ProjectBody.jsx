import React, {useState} from 'react'
import styled from 'styled-components'
import Textarea from '../../Atoms/newworkspace/textarea'




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
        {fontsize : '24px', content : 'hello this is me1', fontweight : '600', type : 'header1' , height : '50px'},
        {fontsize : '24px', content : 'hello this is me2', fontweight : '600', type : 'bulleted list' , height : '50px'},
        {fontsize : '24px', content : 'hello this is me3', fontweight : '600', type : 'header2' , height : '50px'},
        {fontsize : '32px', content : 'hello this is me4', fontweight : '600', type : 'header1' , height : '50px'},
        {fontsize : '24px', content : 'hello this is me5', fontweight : '600', type : 'ordered list' , height : '29.9px'},
        {fontsize : '24px', content : 'hello this is me6', fontweight : '600', type : 'checkbox' , height : '50px'},
        {fontsize : '24px', content : 'hello this is me7', fontweight : '600', type : 'toggle' , height : '50px'},
        {fontsize : '24px', content : 'hello this is me7', fontweight : '600', type : 'table' , height : '200px'},
    ])
    return (
        <WorkspaceBody>
           <Textarea Content={Content} setContent={setContent}  />
        </WorkspaceBody>
    )
}

export default ProjectBody
