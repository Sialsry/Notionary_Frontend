import React from "react";
import styled from "styled-components";
import SignupForm from "../Organisms/SignupForm";
import { Title, Subtitle, Text } from "../Atoms/ming/Typography";
import logo from "../../images/notionary-logo.png";

const PageContainer = styled.div`
  background-color: #fafafa;
  min-height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 680px;
`;

const InfoSection = styled.div`
  flex: 1;
  background-color: #f8f4ff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Logo = styled.img`
  height: 180px;
`;

const InfoBox = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  margin-top: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const FeatureList = styled.ul`
  margin-top: 20px;
  padding-left: 20px;
`;

const FeatureItem = styled.li`
  margin-bottom: 12px;
  position: relative;
  padding-left: 10px;

  &:before {
    content: "•";
    color: #7e57c2;
    font-weight: bold;
    position: absolute;
    left: -12px;
  }
`;

const Footer = styled.footer`
  margin-top: 20px;
  text-align: center;
  color: #888;
  font-size: 14px;
`;

const SignupTemplate = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <InfoSection>
          <LogoContainer>
            <Logo src={logo} alt="Notionary Logo" />
          </LogoContainer>

          <InfoBox>
            <Text>
              <strong>Notionary</strong>는 개인 및 공동 워크스페이스를 제공하고,
              사용자 간 게시판으로 소통할 수 있는 통합 서비스입니다.
            </Text>

            <FeatureList>
              <FeatureItem>
                개인 워크스페이스로 나만의 작업공간을 관리하세요.
              </FeatureItem>
              <FeatureItem>
                팀원들과 함께 사용할 수 있는 공동 워크스페이스를 제공합니다.
              </FeatureItem>
              <FeatureItem>
                커뮤니티 게시판을 통해 다양한 사용자와 소통하세요.
              </FeatureItem>
              <FeatureItem>
                프로젝트 관리 기능으로 업무 효율성을 높이세요.
              </FeatureItem>
              <FeatureItem>
                실시간 알림으로 중요한 업데이트를 놓치지 마세요.
              </FeatureItem>
            </FeatureList>
          </InfoBox>

          <Footer>
            <p>
              이미 계정이 있으신가요?{" "}
              <a
                href="/"
                style={{
                  color: "#7E57C2",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                로그인하기
              </a>
            </p>
            <p>© 2025 Notionary. All rights reserved.</p>
          </Footer>
        </InfoSection>

        <FormSection>
          <SignupForm />
        </FormSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default SignupTemplate;
