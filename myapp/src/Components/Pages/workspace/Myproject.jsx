import React from 'react'
import styled from 'styled-components'
import Input from '../../Atoms/workspace/ProjectInput'
import Sidebar from '../../Templates/Sidebar'
import BlockEditor from '../../Atoms/newworkspace/BlockEditor'
import Header from '../../Templates/Header'
import NewBlock from '../../Atoms/newworkspace/Newspace'
import Sidebarcontent from '../../Molecules/newworkspace/Sidebarcontent'




const Myproject = () => {
  return (<>
      {/* <Sidebar /> */}

      <div>
          <Header />
          <Sidebarcontent />
          {/* <NewBlock /> */}
          <BlockEditor />
      </div>
  </>
  )
}

export default Myproject
