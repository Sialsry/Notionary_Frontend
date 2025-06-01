import React from "react";
import styled from "styled-components";
import LoginForm from "../Organisms/LoginForm";
import { Title, Subtitle, Text } from "../Atoms/ming/Typography";
import logo from "../../images/notionary-logo.png";

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

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  gap: 100px;
`;

const WelcomeSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ecb9f5 0%, #673ab7 80%);
  color: white;
  padding: 40px;
  position: relative;
  overflow: hidden;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #fff;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.05;
  background-image: repeating-linear-gradient(
    45deg,
    #ffffff,
    #ffffff 10px,
    transparent 10px,
    transparent 20px
  );
`;

const BackgroundCircles = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  bottom: -200px;
  right: -200px;

  &:after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    top: -150px;
    left: -150px;
  }
`;

const WelcomeContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 500px;
  text-align: center;
`;

const Logo = styled.img`
  height: 200px;
  margin-bottom: 30px;
`;

const FeatureList = styled.ul`
  margin: 30px 0;
  padding-left: 0;
  list-style-type: none;
  text-align: left;
`;

const FeatureItem = styled.li`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 1.6;

  &:before {
    content: "✓";
    margin-right: 10px;
    font-weight: bold;
    color: #ffeb3b;
  }
`;

const SocialProof = styled.div`
  margin-top: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
`;

const LoginTemplate = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <WelcomeSection>
          <BackgroundPattern />
          <BackgroundCircles />

          <WelcomeContent>
            <Logo src={logo} alt="Notionary Logo" />

            <Subtitle
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1.3rem",
                marginBottom: "30px",
              }}
            >
              업무의 효율성을 높이는 최고의 워크스페이스
            </Subtitle>

            <Text
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1.1rem",
                textAlign: "left",
              }}
            >
              Notionary는 당신의 프로젝트를 위한 최적의 커뮤니티입니다. 간편한
              작업과 소통으로 업무 생산성을 극대화하세요.
            </Text>

            <FeatureList>
              <FeatureItem>
                개인 맞춤형 워크스페이스로 업무 효율성 증가
              </FeatureItem>
              <FeatureItem>이용자 간 워크스페이스 공유, 열람 기능</FeatureItem>
              <FeatureItem>
                강력한 커뮤니티 기능으로 지식 공유 및 네트워킹
              </FeatureItem>
              <FeatureItem>
                직관적인 인터페이스로 누구나 쉽게 사용 가능
              </FeatureItem>
            </FeatureList>

            <SocialProof>
              <Text style={{ color: "white", fontSize: "0.9rem", margin: 0 }}>
                <em>
                  "Notionary는 우리 팀의 생산성을 50% 이상 향상시켰습니다!"
                </em>
                <br />- Elon Musk, CEO of SpaceX
              </Text>
            </SocialProof>
          </WelcomeContent>
        </WelcomeSection>

        <FormSection>
          <LoginForm />
        </FormSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default LoginTemplate;
