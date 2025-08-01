import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../Templates/Header";
import Sidebar from "../../Templates/Sidebar";
import BlockEditor from "../../Atoms/newworkspace/BlockEditor";

const Mainwrap = styled.div`
  padding-top: 95px;
  .title {
    font-size: 22px;
    padding-top: 20px;
    width: 250px;
    margin: 0 600px;
  }
`;

const Detailpage = () => {
  // const [pagestate, setPagestate] = useState(false);
  // console.log(pagestate, 'pagestate')
  return (
    <Mainwrap>
      {/* <Header/> */}
      <BlockEditor />
    </Mainwrap>
  );
};

export default Detailpage;
