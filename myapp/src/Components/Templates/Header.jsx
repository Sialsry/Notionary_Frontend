import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../../images/notionary-logo.png";
import defaultProfile from "../../images/default_profile.png"; // 기본 프로필 이미지 필요

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 75px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  img {
    height: 200px;
    object-fit: contain;
    margin-top: 10px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// 프로필 이미지와 사용자 이름을 감싸는 Wrapper. 이 wrapper를 클릭하면 마이페이지로 이동
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
  background-color: aliceblue;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:active {
    transform: scale(0.95);
  }
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #7e57c2;
`;

const Username = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const LogoutButton = styled.button`
  background-color: #7e57c2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #6a48b7;
  }
`;

const Header = () => {
  const [user, setUser] = useState({
    profileImage: null,
    nickname: "사용자",
  });

  const navigate = useNavigate();

  // 유저 정보 가져오기
  // 유저가 카카오로 로그인하면 카카오
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("authToken");
        const loginAccessToken = Cookies.get("login_access_token");
        console.log("토큰 확인:", token); // 토큰 확인
        console.log("로그인 토큰 확인:", loginAccessToken); // 로그인 토큰 확인

        if (!token) {
          console.log("토큰이 없습니다");
        }

        console.log("API 요청 시작");

        if (token) {
          const response = await axios.get("http://localhost:4000/user/info", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          console.log("API 응답 데이터:", response.data); // 응답 데이터 확인
          setUser({
            profileImage: response.data.user.profImg,
            nickname: response.data.user.nick,
          });
          console.log("유저 정보:", response.data.user); // 유저 정보 확인
        }

        if (loginAccessToken) {
          const response = await axios.get("http://localhost:4000/user/info", {
            headers: { Authorization: `Bearer ${loginAccessToken}` },
            withCredentials: true,
          });
          console.log("로그인 유저 정보:", response.data.user); // 로그인 유저 정보 확인
          setUser({
            profileImage: response.data.user.profImg,
            nickname: response.data.user.nick,
          });
        }
      } catch (error) {
        console.error(
          "유저 정보 가져오기 실패:",
          error.response || error.message || error
        );
      }
    };

    fetchUserData();
  }, []);

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 모든 쿠키 삭제
    Cookies.remove("authToken");
    Cookies.remove("login_access_token");

    // 로그인 페이지로 이동
    navigate("/");
  };

  return (
    <HeaderContainer>
      <UserContainer>
        <ProfileWrapper onClick={() => navigate("/mypage")}>
          <ProfileImage src={user.profileImage} alt="프로필 이미지" />
          <Username>{user.nickname}</Username>
        </ProfileWrapper>
      </UserContainer>
      <LogoContainer>
        <img src={logo} alt="Notionary Logo" />
      </LogoContainer>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
