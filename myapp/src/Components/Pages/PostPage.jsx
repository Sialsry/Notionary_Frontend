import React from "react";
import styled from "styled-components";
import Header from "../Templates/Header";
import PostTemplate from "../Templates/PostTemplate";

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
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const PostPage = () => {
  return (
    <Container>
      {/* <Header /> */}
      <PostTemplate />
    </Container>
  );
};

export default PostPage;
