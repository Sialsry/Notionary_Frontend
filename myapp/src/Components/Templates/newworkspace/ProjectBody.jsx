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
        {fontsize : '24px', content : 'hello this is me', fontweight : '600', type : 'header' , height : '50px'},
        {fontsize : '24px', content : 'hello this is me', fontweight : '600', type : 'Bullet list' , height : '50px'},
        {fontsize : '24px', content : 'hello this is me', fontweight : '600', type : 'header' , height : '50px'},
    ])
    return (
        <WorkspaceBody>
           <Textarea Content={Content} setContent={setContent}  />
        </WorkspaceBody>
    )
}

export default ProjectBody
