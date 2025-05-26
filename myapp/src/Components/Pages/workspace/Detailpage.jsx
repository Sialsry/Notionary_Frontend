import React from "react";
import styled from "styled-components";
import Header from "../../Templates/Header";
import Sidebar from "../../Templates/Sidebar";
import BlockEditor from "../../Atoms/newworkspace/BlockEditor";




const Mainwrap = styled.div`

`



const Detailpage = () => {
  return (
    <Mainwrap>
      <Header/>
      <Sidebar /> 
      <BlockEditor />
    </Mainwrap>
  );
};

export default Detailpage;


