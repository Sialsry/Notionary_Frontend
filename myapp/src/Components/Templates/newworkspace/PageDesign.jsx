import React from "react";
import styled from "styled-components";
// import { cute } from "../../../images/index.js";

const Designwrap = styled.div`
  width: 340px;
  height: 230px;
  border: 1px solid #a8a8a8;
  border-radius: 10px;
  padding: 20px;
  margin: 30px 20px;
  box-sizing: border-box;

  .imgwrap {
    width: 310px;
    display: flex;
    justify-content: center;
  }
  img {
    height: 150px;
    cursor: pointer;
  }
  .Title {
    height: 35px;
    box-sizing: border-box;
  }
`;

const PageDesign = () => {
  return (
    <Designwrap>
      <div className="Title">제목 : 12aaaaaa3</div>
      <div className="imgwrap">{/* <img src={cute} alt="" /> */}</div>
    </Designwrap>
  );
};

export default PageDesign;
