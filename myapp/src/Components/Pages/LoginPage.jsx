import React from "react";
import LoginTemplate from "../Templates/LoginTemplate";
import styled from "styled-components";

const PageContainer = styled.div`
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
  position: relative;
`;

const LoginPage = () => {
  // 로그인 페이지로 돌아오면 쿠키 삭제
  // clearCookies();
  return (
    <div>
      <PageContainer>
        <LoginTemplate />
      </PageContainer>
    </div>
  );
};

export default LoginPage;
