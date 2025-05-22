import React from 'react'
import styled from 'styled-components'
import ProjectBody from '../Templates/workspace/ProjectBody'
import Input from '../Atoms/workspace/ProjectInput'
import Sidebar from '../Templates/Sidebar'
import BlockEditor from '../Templates/BlockEditor'




const Myproject = () => {
  return (<>
      {/* <Sidebar /> */}

      <div>
          {/* <Header /> */}
          <Sidebar />
          <BlockEditor />
      </div>
  </>
  )
}

export default Myproject
