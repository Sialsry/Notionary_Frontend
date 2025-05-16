import React from 'react'
import styled from 'styled-components'
import ProjectInput from '../Atoms/ProjectInput'


const Contentwrap = styled.div`
    
`

const ProjectContent = ({inputValue}) => {
  return (
    <div>
       <ProjectInput inputValue={inputValue}/>
    </div>
  )
}

export default ProjectContent
