import React from "react";
import styled from "styled-components";
import { Edit3 } from "lucide-react";
import PostForm from "../Organisms/PostForm";

// 컬러 팔레트 (마이페이지와 동일)
const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#f093fb",
  success: "#4ecdc4",
  warning: "#ffe066",
  info: "#74b9ff",
  danger: "#fd79a8",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gradientAccent: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  gradientSuccess: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
  gradientInfo: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
};

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
`;

const HeaderCard = styled.div`
  margin-top: 75px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  margin-bottom: 24px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const PageSubtitle = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
`;

const PostTemplate = () => (
  <Container>
    {/* <HeaderCard>
      <PageTitle>
      </PageTitle>
      {/* <PageSubtitle>
      </PageSubtitle> 
    </HeaderCard> */}
    <PostForm />
  </Container>
);

export default PostTemplate;
