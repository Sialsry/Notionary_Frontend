import React from "react";
import Sidebar from "../Templates/Sidebar";
import styled from "styled-components";
import Categories from "../Molecules/Categories";
import Button from "../Atoms/ming/SignupButton";
import Header from "../Templates/Header";

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: max-content;
  background-color: #fff;
`;

const Main = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <MainWrap>
        <Categories items={["IT", "기술스택", "디자인", "여행", "기타"]} />
      </MainWrap>
      {/* <Button
        type="button"
        secondary
        fullWidth
        onClick={() =>
          (window.location.href = "http://localhost:4000/main/unlink")
        }
        style={{
          backgroundColor: "#FEE500",
          color: "#000",
          border: "none",
        }}
      >
        카카오 계정으로 회원 탈퇴
      </Button> */}
    </>
  );
};

export default Main;
