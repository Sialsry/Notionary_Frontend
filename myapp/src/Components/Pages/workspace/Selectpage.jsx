// import React, { useState } from 'react'
// import styled from 'styled-components'
// import Sidebar from '../../Templates/Sidebar'
// import PageDesign from '../../Templates/newworkspace/PageDesign'
// import Header from '../../Templates/Header'
// import { getWspacecontent } from '../../../API/Workspaceapi'

// const Pagewrap = styled.div`
    
//     .Pagedesign{
//         width: 1650px;
//         margin-top: 0px;
//         margin-left: 240px;
//         min-height: calc(100vh - 380px);
//         padding: 30px 235px;
//         box-sizing: border-box;
//         display: flex;
//         justify-content: flex-start;
//         flex-wrap: wrap;
//         gap: 20px;
        
//     }
//     .workspaceTitle {
//       margin-left: 495px;
//       margin-top: 50px;
//     }
    
// `

// const Selectpage = ({header}) => {


//   const [data, setData] = useState([])
//   const workspacecontent = async () => {
//    const data = await getWspacecontent(header);
//    console.log(data, 'getwspaceconte11')
//    setData(data )
//   }
//   workspacecontent()

//   return (
//     <Pagewrap>
//       <Header />
//       <Sidebar />
//       <div className='workspaceTitle'>
//         <h1>{header}</h1>
//       </div>
//       <div className='Pagedesign'>  
//             {data.map((el) => <PageDesign />)}
//       </div>
//     </Pagewrap>
//   )
// }

// export default Selectpage
