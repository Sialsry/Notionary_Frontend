import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Heart,
  MessageCircle,
  Edit3,
  Plus,
  Users,
  Calendar,
  FileText,
  Folder,
  Upload,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "../../images/notionary-logo.png";

// 컬러 팔레트
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

// 아토믹 디자인 패턴 - Atoms
const Button = styled.button`
  padding: ${(props) => (props.size === "small" ? "6px 12px" : "10px 20px")};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: ${(props) => (props.size === "small" ? "12px" : "14px")};

  ${(props) =>
    props.variant === "primary" &&
    `
    background: ${colors.gradient};
    color: white;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background: #f8f9fa;
    color: #495057;
    border: 1px solid #dee2e6;
    &:hover {
      background: #e9ecef;
      border-color: ${colors.primary};
    }
  `}
  
  ${(props) =>
    props.variant === "accent" &&
    `
    background: ${colors.gradientAccent};
    color: white;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);
    }
  `}
  
  ${(props) =>
    props.variant === "success" &&
    `
    background: ${colors.gradientSuccess};
    color: white;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
    }
  `}
`;

const Avatar = styled.div`
  width: ${(props) => props.size || "60px"};
  height: ${(props) => props.size || "60px"};
  border-radius: 50%;
  background: ${colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: ${(props) => (props.size === "120px" ? "36px" : "18px")};
  background-image: ${(props) => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  background-position: center;
  position: relative;
  border: 4px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.editable &&
    `
    cursor: pointer;
    &:hover::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: ${(props) => (props.compact ? "16px" : "24px")};
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  transition: all 0.2s ease;
  height: ${(props) => props.height || "auto"};
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 35px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${(props) => {
    switch (props.type) {
      case "frontend":
        return colors.gradientInfo;
      case "backend":
        return colors.gradientSuccess;
      case "design":
        return colors.gradientAccent;
      default:
        return "#e9ecef";
    }
  }};
  color: ${(props) => (props.type ? "white" : "#495057")};
`;

// Molecules
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  text-align: center;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid ${colors.primary};

  .label {
    font-size: 11px;
    color: #6c757d;
    font-weight: 600;
    text-transform: uppercase;
  }

  .value {
    font-size: 14px;
    color: #212529;
    font-weight: 500;
  }
`;

const PostItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%);
    border-color: ${colors.primary};
  }
`;

const PostThumbnail = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: ${colors.gradientInfo};
  background-image: ${(props) => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const PostContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: #6c757d;
`;

const WorkspaceItem = styled.div`
  padding: 23px;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%);
  }
`;

const TeamTooltip = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  background: #212529;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 11px;
  white-space: nowrap;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: all 0.2s ease;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #212529;
  }
`;

// 페이지네이션 컴포넌트
const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const PageButton = styled.button`
  padding: 6px 10px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;

  ${(props) =>
    props.active &&
    `
    background: ${colors.primary};
    color: white;
    border-color: ${colors.primary};
  `}

  &:hover:not(:disabled) {
    background: ${(props) => (props.active ? colors.primary : "#f8f9fa")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 모달 컴포넌트
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #212529;
    font-size: 14px;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${colors.primary};
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.primary};
    background: #f8f9ff;
  }

  input[type="file"] {
    display: none;
  }
`;

// 메인 컨테이너
const Container = styled.div`
  height: 100vh;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
`;

const LeftPanel = styled.div`
  width: 350px;
  padding: 24px;
  padding-top: 0px;
  background: white;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img:hover {
    scale: 1.05;
    transition: all 0.2s ease;
  }
`;

// const Logo = styled.div`
//   font-family: "Brush Script MT", cursive;
//   font-size: 28px;
//   font-weight: bold;
//   background: ${colors.gradient};
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
// `;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #212529;
  margin: 0;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 1;
  min-height: 0;
`;

const SectionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: -1%;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f1f3f4;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;

  margin: -8px;
  padding: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.primary};
    border-radius: 4px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: #6c757d;

  .icon {
    font-size: 36px;
    margin-bottom: 12px;
    opacity: 0.6;
  }

  .message {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

// 페이지네이션 컴포넌트
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisible = 5;

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <PaginationContainer>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={12} />
      </PageButton>
      {pages.map((page) => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={12} />
      </PageButton>
    </PaginationContainer>
  );
};

// 메인 컴포넌트
const MyPage = () => {
  const [user, setUser] = useState({
    uid: null,
    profileImage: null,
    nickname: "사용자",
    gender: null,
    phone: null,
    dob: null,
    addr: null,
  });

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
            uid: response.data.user.uid,
            profImg: response.data.user.profImg,
            nick: response.data.user.nick,
            gender: response.data.user.gender,
            phone: response.data.user.phone,
            dob: response.data.user.dob,
            addr: response.data.user.addr,
          });
          setEditForm({
            uid: response.data.user.uid,
            profImg: response.data.user.profImg,
            nick: response.data.user.nick,
            gender: response.data.user.gender,
            phone: response.data.user.phone,
            dob: response.data.user.dob,
            addr: response.data.user.addr,
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
            uid: response.data.user.uid,
            profImg: response.data.user.profImg,
            nick: response.data.user.nick,
            gender: response.data.user.gender,
            phone: response.data.user.phone,
            dob: response.data.user.dob,
            addr: response.data.user.addr,
          });
          setEditForm({
            uid: response.data.user.uid,
            profImg: response.data.user.profImg,
            nick: response.data.user.nick,
            gender: response.data.user.gender,
            phone: response.data.user.phone,
            dob: response.data.user.dob,
            addr: response.data.user.addr,
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

  useEffect(() => {
    console.log("유저 정보:", user); // 유저 정보 확인
  }, [user]);

  // 더미 데이터 (페이지네이션 테스트용)
  const [allPosts] = useState([]);

  const [allMyProjects] = useState([]);

  const [allTeamProjects] = useState([]);

  // 페이지네이션 상태
  const [postPage, setPostPage] = useState(1);
  const [myProjectPage, setMyProjectPage] = useState(1);
  const [teamProjectPage, setTeamProjectPage] = useState(1);
  const itemsPerPage = 5;

  // 페이지네이션 계산
  const getPaginatedData = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      items: data.slice(startIndex, endIndex),
      totalPages: Math.ceil(data.length / itemsPerPage),
    };
  };

  const paginatedPosts = getPaginatedData(allPosts, postPage);
  const paginatedMyProjects = getPaginatedData(allMyProjects, myProjectPage);
  const paginatedTeamProjects = getPaginatedData(
    allTeamProjects,
    teamProjectPage
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(user);
  const [hoveredTeam, setHoveredTeam] = useState(null);

  // 프로필 수정 핸들러. 백엔드로 유저 정보 update 요청
  const handleEditSubmit = () => {
    const token = Cookies.get("authToken");
    const loginAccessToken = Cookies.get("login_access_token");
    const accessToken = token || loginAccessToken;
    const url = "http://localhost:4000/user/update";
    const formData = new FormData();
    console.log("전송할 데이터:", editForm);
    formData.append("uid", editForm.uid);
    formData.append("nick", editForm.nick);
    formData.append("profImg", editForm.profImg);
    formData.append("gender", editForm.gender);
    formData.append("phone", editForm.phone);
    formData.append("dob", editForm.dob);
    formData.append("addr", editForm.addr);
    const dummyData = {};
    for (const [key, value] of formData.entries()) {
      dummyData[key] = value;
    }
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("수정 성공:", response.data);
        setUser({ ...user, ...editForm });

        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("수정 실패:", error.response || error.message || error);
      });
    setShowEditModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm({ ...editForm, profImg: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getCategoryType = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "frontend":
        return "frontend";
      case "backend":
        return "backend";
      case "design":
        return "design";
      default:
        return "default";
    }
  };

  return (
    <Container>
      <LeftPanel>
        {/* 로고 이미지를 클릭하면 메인 페이지로 이동 */}
        <Header>
          <img
            src={logo}
            alt="Notionary Logo"
            style={{ cursor: "pointer", width: "150px" }}
            onClick={() => (window.location.href = "/main")}
          />
        </Header>

        {/* 내 정보 영역 */}
        <Card>
          <UserInfo>
            <Avatar size="120px" src={user.profImg}>
              {!user.profImg}
            </Avatar>
            <div>
              <h2
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                {user.nick}
              </h2>
              <p style={{ margin: "0", color: "#6c757d", fontSize: "14px" }}>
                @{user.uid}
              </p>
            </div>
          </UserInfo>

          <UserDetails>
            <DetailItem>
              <span className="label">성별</span>
              <span className="value">{user.gender || "미설정"}</span>
            </DetailItem>
            <DetailItem>
              <span className="label">전화번호</span>
              <span className="value">{user.phone || "미설정"}</span>
            </DetailItem>
            <DetailItem>
              <span className="label">생년월일</span>
              <span className="value">{user.dob || "미설정"}</span>
            </DetailItem>
            <DetailItem>
              <span className="label">주소</span>
              <span className="value">{user.addr || "미설정"}</span>
            </DetailItem>
          </UserDetails>

          <Button variant="primary" onClick={() => setShowEditModal(true)}>
            <Edit3 size={14} />내 정보 수정
          </Button>
        </Card>
      </LeftPanel>

      <RightPanel>
        <ContentGrid>
          {/* 내가 작성한 게시글 */}
          <SectionCard>
            <SectionTitle>
              <FileText size={16} color={colors.info} />
              내가 작성한 게시글 ({allPosts.length})
            </SectionTitle>
            <ScrollableContent>
              {paginatedPosts.items.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {paginatedPosts.items.map((post) => (
                    <PostItem key={post.post_id}>
                      <PostThumbnail src={post.imgPaths}>
                        {!post.imgPaths && <FileText size={20} />}
                      </PostThumbnail>
                      <PostContent>
                        <div>
                          <h4
                            style={{
                              margin: "0 0 4px 0",
                              fontSize: "13px",
                              fontWeight: "600",
                              lineHeight: "1.3",
                            }}
                          >
                            {post.title}
                          </h4>
                          <Badge type={getCategoryType(post.category_name)}>
                            {post.category_name}
                          </Badge>
                        </div>
                        <PostStats>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                          >
                            <Heart size={10} color={colors.danger} />
                            {post.hearts}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                          >
                            <MessageCircle size={10} color={colors.info} />
                            {post.comments}
                          </span>
                          <span>{post.created_at}</span>
                        </PostStats>
                      </PostContent>
                    </PostItem>
                  ))}
                </div>
              ) : (
                <EmptyState>
                  <div className="icon">📝</div>
                  <div className="message">아직 작성한 게시글이 없습니다</div>
                  <Button variant="accent" size="small">
                    <Plus size={14} />
                    글쓰기
                  </Button>
                </EmptyState>
              )}
            </ScrollableContent>
            {paginatedPosts.totalPages > 1 && (
              <Pagination
                currentPage={postPage}
                totalPages={paginatedPosts.totalPages}
                onPageChange={setPostPage}
              />
            )}
          </SectionCard>

          {/* 개인 워크스페이스 */}
          <SectionCard>
            <SectionTitle>
              <Folder size={16} color={colors.success} />
              개인 워크스페이스 ({allMyProjects.length})
            </SectionTitle>
            <ScrollableContent>
              {paginatedMyProjects.items.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {paginatedMyProjects.items.map((project) => (
                    <WorkspaceItem key={project.project_id}>
                      <h4
                        style={{
                          margin: "0 0 6px 0",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {project.project_name}
                      </h4>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "11px",
                          color: "#6c757d",
                        }}
                      >
                        생성일: {project.created_at}
                      </p>
                    </WorkspaceItem>
                  ))}
                </div>
              ) : (
                <EmptyState>
                  <div className="icon">📂</div>
                  <div className="message">워크스페이스를 만들어보세요</div>
                  <Button variant="success" size="small">
                    <Plus size={14} />새 워크스페이스
                  </Button>
                </EmptyState>
              )}
            </ScrollableContent>
            {paginatedMyProjects.totalPages > 1 && (
              <Pagination
                currentPage={myProjectPage}
                totalPages={paginatedMyProjects.totalPages}
                onPageChange={setMyProjectPage}
              />
            )}
          </SectionCard>
        </ContentGrid>

        {/* 팀 워크스페이스 - 전체 너비 */}
        <SectionCard>
          <SectionTitle>
            <Users size={16} color={colors.warning} />팀 워크스페이스 (
            {allTeamProjects.length})
          </SectionTitle>
          <ScrollableContent>
            {paginatedTeamProjects.items.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "12px",
                }}
              >
                {paginatedTeamProjects.items.map((project) => (
                  <WorkspaceItem
                    key={project.project_id}
                    onMouseEnter={() => setHoveredTeam(project.project_id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                  >
                    <TeamTooltip show={hoveredTeam === project.project_id}>
                      <div style={{ marginBottom: "6px" }}>
                        <strong>팀원:</strong> {project.members.join(", ")}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Calendar size={10} />
                        생성일: {project.created_at}
                      </div>
                    </TeamTooltip>

                    <h4
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {project.project_name}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Users size={10} color={colors.warning} />
                      <span style={{ fontSize: "11px", color: "#6c757d" }}>
                        {project.members.length}명
                      </span>
                    </div>
                  </WorkspaceItem>
                ))}
              </div>
            ) : (
              <EmptyState>
                <div className="icon">👥</div>
                <div className="message">
                  참여중인 팀 워크스페이스가 없습니다
                </div>
                <Button variant="primary" size="small">
                  <Plus size={14} />팀 만들기
                </Button>
              </EmptyState>
            )}
          </ScrollableContent>
          {paginatedTeamProjects.totalPages > 1 && (
            <Pagination
              currentPage={teamProjectPage}
              totalPages={paginatedTeamProjects.totalPages}
              onPageChange={setTeamProjectPage}
            />
          )}
        </SectionCard>
      </RightPanel>

      {/* 수정 모달 */}
      {showEditModal && (
        <ModalOverlay onClick={() => setShowEditModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3
              style={{
                margin: "0 0 24px 0",
                fontSize: "20px",
                fontWeight: "600",
                color: "#212529",
              }}
            >
              내 정보 수정
            </h3>

            <FormGroup>
              <label>프로필 이미지</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "12px",
                }}
              >
                <Avatar size="80px" src={user.profImg} editable>
                  {!user.profImg}
                </Avatar>
                <div>
                  <ImageUploadArea>
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="profile-upload"
                      style={{ cursor: "pointer", display: "block" }}
                    >
                      <Camera
                        size={24}
                        color={colors.primary}
                        style={{ marginBottom: "8px" }}
                      />
                      <div style={{ fontSize: "12px", color: "#6c757d" }}>
                        클릭하여 이미지 업로드
                      </div>
                    </label>
                  </ImageUploadArea>
                </div>
              </div>
            </FormGroup>

            <div>
              <FormGroup>
                <label>닉네임</label>
                <input
                  type="text"
                  value={user.nick}
                  onChange={(e) =>
                    setEditForm({ ...editForm, nick: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label>성별</label>
                <input
                  type="text"
                  value={user.gender}
                  onChange={(e) =>
                    setEditForm({ ...editForm, gender: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label>전화번호</label>
                <input
                  type="text"
                  value={user.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label>생년월일</label>
                <input
                  type="date"
                  value={user.dob}
                  onChange={(e) =>
                    setEditForm({ ...editForm, dob: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label>주소</label>
                <input
                  type="text"
                  value={user.addr}
                  onChange={(e) =>
                    setEditForm({ ...editForm, addr: e.target.value })
                  }
                />
              </FormGroup>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  취소
                </Button>
                <Button variant="primary" onClick={handleEditSubmit}>
                  저장
                </Button>
              </div>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default MyPage;
