import React from 'react'
import styled from 'styled-components'
import Input from '../Atoms/workspace/ProjectInput'
import Sidebar from '../Templates/Sidebar'
import BlockEditor from '../Templates/BlockEditor'
import Header from '../Templates/Header'
import NewBlock from '../Atoms/newworkspace/Newspace'




const Myproject = () => {
  return (<>
      {/* <Sidebar /> */}

      <div>
          <Header />
          {/* <Sidebar /> */}
          <NewBlock />
          {/* <BlockEditor /> */}
      </div>
  </>
  )
}

export default Myproject
