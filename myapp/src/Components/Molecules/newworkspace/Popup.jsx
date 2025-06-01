import React from "react";
import styled from "styled-components";
import { DelWorkspace } from "../../../API/Workspaceapi";

const Popwrap = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  /* z-index: 1000; */
  backdrop-filter: blur(3px);
  /* background-color: #c2c2c2; */
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popupbody = styled.div`
  border: 1px solid #b4b4b4;
  width: 500px;
  height: 300px;
  background-color: white;
  box-shadow: 0 0 18px -10px;
  border-radius: 10px;
  padding: 50px;
  gap: 80px;
  font-size: 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 170px;
    height: 50px;
    margin: 0 10px;
    font-size: 18px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
  .submitbtn {
    background-color: green;
    color: white;
  }
  .submitbtn:hover {
    background-color: #079107;
  }
  .cancelbtn:hover {
    background-color: #da3636;
  }
  .cancelbtn {
    background-color: #c41b1b;
  }
`;

const Popup = ({ children }) => {
  return (
    <Popwrap>
      <Popupbody>
        <div>삭제하시겠습니까 ??</div>
        <div>
          <button className="cancelbtn">취소</button>
          <button className="submitbtn">완료</button>
        </div>
      </Popupbody>
    </Popwrap>
  );
};

export default Popup;
