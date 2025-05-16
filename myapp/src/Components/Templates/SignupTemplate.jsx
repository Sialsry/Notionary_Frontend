import React from "react";
import styled from "styled-components";
import SignupForm from "../Organisms/SignupForm";

const PageContainer = styled.div`
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
`;

const LogoContainer = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const Logo = styled.img`
  height: 60px;
`;

const Footer = styled.footer`
  margin-top: 40px;
  text-align: center;
  color: #888;
  font-size: 14px;
`;

const SignupTemplate = () => {
  return (
    <PageContainer>
      <LogoContainer>
        <Logo src="../../../images/notionary-logo.png" alt="Notionary Logo" />
      </LogoContainer>

      <SignupForm />

      <Footer>
        <p>
          이미 계정이 있으신가요?{" "}
          <a href="/login" style={{ color: "#7E57C2", textDecoration: "none" }}>
            로그인하기
          </a>
        </p>
        <p>© 2025 Notionary. All rights reserved.</p>
      </Footer>
    </PageContainer>
  );
};

export default SignupTemplate;
