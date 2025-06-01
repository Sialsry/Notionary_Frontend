// import { useQuery } from "@tanstack/react-query"
// import { getBlockIdcontent } from "../../../API/Workspaceapi"
// import styled from "styled-components"
// import BlockEditorcopy from "./BlockEditorcopy"



// const Viewwrap = styled.div`
//     width: 100vw;
//     height: 100vh;
//     position: fixed;
//     top: 0;
//     left: 0;
//     backdrop-filter: blur(10px);
// `
// const Workspaceview = ({ result_id }) => {
//     console.log(result_id, 'dsafdsaf')
//     const { data, isLoading } = useQuery({
//         queryKey: ["workspacePageData", result_id],
//         queryFn: async () => {
//             const data = await getBlockIdcontent(result_id)
//             return data
//             // const newPageBLocks = pageBlocks.reduce((acc,el) => {
//             //   acc[el.id] = el
//             //   return acc
//             // })
//             // setBlocks({...blocks, ...newPageBLocks})
//         }
//     })
//     const newData = data?.workspacePageData.data.data
//     console.log(Array.isArray(newData), 'newdataarray', newData)
//     return (
//         <Viewwrap>
//             <div className='Blockcontent'>
//                 {result_id ? newData?.map((el, index) => <div className='Blocks'><BlockEditorcopy key={index} el={el} /></div>) : null}
//             </div>
//         </Viewwrap>
//     )
// }


// export default Workspaceview