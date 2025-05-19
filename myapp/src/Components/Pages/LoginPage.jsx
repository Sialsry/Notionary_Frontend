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
  return (
    <div>
      <PageContainer>
        <LoginTemplate />
      </PageContainer>
    </div>
  );
};

export default LoginPage;
