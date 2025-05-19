import React from 'react'
import styled from 'styled-components'
import ProjectInput from '../../Atoms/workspace/ProjectInput'


const Contentwrap = styled.div`
    /* display: flex; */
    /* width: 510px; */
    /* height: 49.99px; */
    position:relative;
    span {
      position: absolute;
      /* right: ; */
    }
`

const ProjectContent = ({inputValue}) => {
    const icon = [header, bulletlist, numberlist, todolist, togglelist]
    const icontitle = ['header', 'bullet list', 'numbered list', 'todo list', 'toggle list']
  return (
    <Contentwrap>
       <ProjectInput inputValue={inputValue} icon={icon} title={icontitle} />
    </Contentwrap>
  )
}

export default ProjectContent
