import React from 'react'
import styled from 'styled-components'
import ProjectInput from '../Atoms/workspace/ProjectInput'


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
  return (
    <Contentwrap>
       <ProjectInput inputValue={inputValue}/>
    </Contentwrap>
  )
}

export default ProjectContent
