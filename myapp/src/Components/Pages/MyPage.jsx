import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  User,
  ThumbsUp,
  MessageSquare,
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
  gradientWarning: "linear-gradient(135deg, #fde47f 0%, #f9d423 100%)",
};

// 기존 styled components들은 동일하게 유지...
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

  // info
  ${(props) =>
    props.variant === "info" &&
    `
    background: ${colors.gradientInfo};
    color: white;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(116, 185, 255, 0.3);
    }
    `}

  // warning
    ${(props) =>
    props.variant === "warning" &&
    `
    background: ${colors.gradientWarning};
    color: white;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(255, 224, 102, 0.3);
    }
    `}

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
        return colors.gradient;
    }
  }};
  color: ${(props) => (props.type ? "white" : "#495057")};
`;

// 탭 관련 styled components 추가
const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #f1f3f4;
  margin-bottom: 16px;
`;

const TabButton = styled.button`
  padding: 12px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: #6c757d;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;

  ${(props) =>
    props.active &&
    `
    color: ${colors.primary};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${colors.primary};
    }
  `}

  &:hover {
    color: ${colors.primary};
    background: rgba(102, 126, 234, 0.05);
  }
`;

// 기존 컴포넌트들...
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

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const AuthorAvatar = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${colors.gradient};
  background-image: ${(props) => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 8px;
  font-weight: 600;
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: #6c757d;
`;

const WorkspaceItem = styled.div`
  padding: 20px;
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

// 페이지네이션 컴포넌트들...
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

// 모달 컴포넌트들...
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

// 메인 컨테이너들...
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

const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 1fr 1fr; */
  gap: 20px;
  flex: 1;
  min-height: 0;
`;

const SectionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 50%;
  margin-top: 2vh;
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

// 전체 너비 카드 (워크스페이스용)
const FullWidthCard = styled(Card)`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  height: 300px;
`;

// 페이지네이션 컴포넌트
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisible = 100;

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
  const navigate = useNavigate();
  const [user, setUser] = useState({
    uid: null,
    profImg: null,
    nick: "사용자",
    gender: null,
    phone: null,
    dob: null,
    addr: null,
  });

  const [editForm, setEditForm] = useState(user);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 데이터 상태들
  const [allPosts, setAllPost] = useState([]);
  const [allMyProjects, setAllMyProjects] = useState([]);
  const [allTeamProjects, setAllTeamProjects] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // 탭 상태 (워크스페이스용)
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState("personal"); // 'personal' 또는 'team'

  // 페이지네이션 상태
  const [postPage, setPostPage] = useState(1);
  const [likedPostPage, setLikedPostPage] = useState(1);
  const [commentedPostPage, setCommentedPostPage] = useState(1);
  const [workspacePage, setWorkspacePage] = useState(1);
  const itemsPerPage = 7;

  // 유저 정보 가져오기 함수
  const fetchUserData = async () => {
    try {
      const token = Cookies.get("authToken");
      const loginAccessToken = Cookies.get("login_access_token");
      const accessToken = token || loginAccessToken;

      if (!accessToken) {
        console.log("토큰이 없습니다");
        return;
      }

      const response = await axios.get("http://localhost:4000/user/info", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });

      const userData = response.data.user;
      setUser(userData);
      setEditForm(userData);
      console.log("유저 정보 가져오기 성공:", userData);
    } catch (error) {
      console.error("유저 정보 가져오기 실패:", error);
    }
  };

  // 게시글 데이터 가져오기 함수들
  const fetchUserPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const token = Cookies.get("authToken");
      const loginAccessToken = Cookies.get("login_access_token");
      const accessToken = token || loginAccessToken;

      if (!accessToken) {
        console.log("토큰이 없습니다");
        return;
      }

      const response = await axios.get(
        "http://localhost:4000/mypage/getMyPost",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      setAllPost(response.data.data || []);
    } catch (error) {
      console.error("게시글 가져오기 실패:", error);
      setAllPost([]);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  // 좋아요 누른 게시글 가져오기
  const fetchLikedPosts = async () => {
    try {
      const token = Cookies.get("authToken");
      const loginAccessToken = Cookies.get("login_access_token");
      const accessToken = token || loginAccessToken;

      if (!accessToken) return;

      console.log("토큰:", accessToken);
      const response = await axios.get(
        "http://localhost:4000/mypage/getLikedPosts",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      setLikedPosts(response.data.data || []);
    } catch (error) {
      console.error("좋아요 게시글 가져오기 실패:", error);
      setLikedPosts([]);
    }
  };

  // 댓글 작성한 게시글 가져오기
  const fetchCommentedPosts = async () => {
    try {
      const token = Cookies.get("authToken");
      const loginAccessToken = Cookies.get("login_access_token");
      const accessToken = token || loginAccessToken;

      if (!accessToken) return;

      const response = await axios.get(
        "http://localhost:4000/mypage/getCommentedPosts",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      setCommentedPosts(response.data.data || []);
    } catch (error) {
      console.error("댓글 게시글 가져오기 실패:", error);
      setCommentedPosts([]);
    }
  };

  // 프로젝트 데이터 가져오기 함수들
  const fetchMyProjects = async () => {
    try {
      const accessToken =
        Cookies.get("login_access_token") || Cookies.get("authToken");
      const response = await axios.get(
        "http://localhost:4000/mypage/getMyWorkspace",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      console.log("내 프로젝트 가져오기 성공:", response);
      // setAllMyProjects(response.data.projects || []);
    } catch (error) {
      console.error("내 프로젝트 가져오기 실패:", error);
      setAllMyProjects([]);
    }
  };

  // useEffect에서 모든 데이터 가져오기
  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
    fetchLikedPosts();
    fetchCommentedPosts();
    fetchMyProjects();
  }, []);

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
  const paginatedLikedPosts = getPaginatedData(likedPosts, likedPostPage);
  const paginatedCommentedPosts = getPaginatedData(
    commentedPosts,
    commentedPostPage
  );

  // 워크스페이스 탭에 따른 데이터 선택
  const currentWorkspaceData = allMyProjects;
  const paginatedWorkspace = getPaginatedData(
    currentWorkspaceData,
    workspacePage
  );

  // 프로필 관련 함수들은 기존과 동일
  const handleEditSubmit = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("authToken");
      const loginAccessToken = Cookies.get("login_access_token");
      const accessToken = token || loginAccessToken;

      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const formData = new FormData();
      formData.append("nick", editForm.nick || "");
      formData.append("gender", editForm.gender || "");
      formData.append("phone", editForm.phone || "");
      formData.append("dob", editForm.dob || "");
      formData.append("addr", editForm.addr || "");

      if (selectedFile) {
        formData.append("profImg", selectedFile);
      }

      const response = await axios.post(
        "http://localhost:4000/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      await fetchUserData();
      setShowEditModal(false);
      setPreviewImage(null);
      setSelectedFile(null);
      alert("프로필이 성공적으로 업데이트되었습니다!");
    } catch (error) {
      console.error("수정 실패:", error);
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하로 선택해주세요.");
        return;
      }

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("JPG, JPEG, PNG 파일만 업로드 가능합니다.");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setSelectedFile(file);
    }
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setEditForm(user);
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const getCurrentProfileImage = () => {
    if (previewImage) return previewImage;
    return user.profImg;
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

  const handlePostClick = (postId) => {
    navigate(`/detail/${postId}`);
  };

  // 게시글 렌더링 함수
  const renderPostList = (
    posts,
    emptyMessage,
    emptyIcon,
    showAuthor = false,
    buttonMessage,
    buttonColor
  ) => (
    <>
      {posts.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {posts.map((post) => (
            <PostItem
              key={post.post_id}
              onClick={() => handlePostClick(post.post_id)} // 클릭 핸들러 추가
              style={{ cursor: "pointer" }} // 커서 포인터 추가
            >
              <PostThumbnail src={post.firstImage || post.imgPaths}>
                {!post.firstImage && !post.imgPaths && <FileText size={20} />}
              </PostThumbnail>
              <PostContent>
                {/* 작성자 정보 (좋아요/댓글 게시글에서만 표시) */}
                {showAuthor && post.author && (
                  <AuthorInfo>
                    <AuthorAvatar src={post.author.profImg}>
                      {!post.author.profImg && post.author.nick?.charAt(0)}
                    </AuthorAvatar>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#6c757d",
                        fontWeight: "500",
                      }}
                    >
                      {post.author.nick}
                    </span>
                  </AuthorInfo>
                )}

                <div>
                  <h4
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.3",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
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
                  <span>{post.createdAt}</span>
                </PostStats>
              </PostContent>
            </PostItem>
          ))}
        </div>
      ) : (
        <EmptyState>
          <div className="icon">{emptyIcon}</div>
          <div className="message">{emptyMessage}</div>
          <Button
            variant={`${buttonColor}`}
            size="small"
            onClick={() =>
              navigate(`${buttonMessage === "게시글 작성" ? "/post" : "/main"}`)
            }
          >
            <Plus size={14} /> {buttonMessage}
          </Button>
        </EmptyState>
      )}
    </>
  );

  return (
    <Container>
      <LeftPanel>
        <Header>
          <img
            src={logo}
            alt="Notionary Logo"
            style={{ cursor: "pointer", width: "150px" }}
            onClick={() => (window.location.href = "/main")}
          />
        </Header>

        <Card>
          <UserInfo>
            <Avatar size="120px" src={getCurrentProfileImage()}>
              {!getCurrentProfileImage() && user.nick?.charAt(0)}
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
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              height: "50%",
            }}
          >
            <SectionCard>
              <SectionTitle>
                <FileText size={16} color={colors.info} />
                내가 작성한 게시글 ({allPosts.length})
              </SectionTitle>
              <ScrollableContent>
                {renderPostList(
                  paginatedPosts.items,
                  "아직 작성한 게시글이 없습니다",
                  "📝",
                  false, // 내 게시글이므로 작성자 정보 표시 안함
                  "게시글 작성",
                  "info"
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

            {/* 좋아요 누른 게시글 */}
            <SectionCard>
              <SectionTitle>
                <ThumbsUp size={16} color={colors.danger} />
                좋아요 누른 게시글 ({likedPosts.length})
              </SectionTitle>
              <ScrollableContent>
                {renderPostList(
                  paginatedLikedPosts.items,
                  "좋아요를 누른 게시글이 없습니다",
                  "❤️",
                  true, // 다른 사람 게시글이므로 작성자 정보 표시
                  "게시글 보러가기",
                  "accent"
                )}
              </ScrollableContent>
              {paginatedLikedPosts.totalPages > 1 && (
                <Pagination
                  currentPage={likedPostPage}
                  totalPages={paginatedLikedPosts.totalPages}
                  onPageChange={setLikedPostPage}
                />
              )}
            </SectionCard>

            {/* 댓글 작성한 게시글 */}
            <SectionCard>
              <SectionTitle>
                <MessageSquare size={16} color={colors.success} />
                댓글 작성한 게시글 ({commentedPosts.length})
              </SectionTitle>
              <ScrollableContent>
                {renderPostList(
                  paginatedCommentedPosts.items,
                  "댓글을 작성한 게시글이 없습니다",
                  "💬",
                  true, // 다른 사람 게시글이므로 작성자 정보 표시
                  "게시글 보러가기",
                  "success"
                )}
              </ScrollableContent>
              {paginatedCommentedPosts.totalPages > 1 && (
                <Pagination
                  currentPage={commentedPostPage}
                  totalPages={paginatedCommentedPosts.totalPages}
                  onPageChange={setCommentedPostPage}
                />
              )}
            </SectionCard>
          </div>

          {/* 통합 워크스페이스 - 전체 너비 */}
          {/* <div>
            <FullWidthCard>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Folder size={16} color={colors.warning} />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#212529",
                    }}
                  >
                    내 워크스페이스
                  </span>
                </div>
              </div> */}

          {/* 탭 메뉴 */}
          {/* <TabContainer> */}
          {/* <TabButton
                  active={activeWorkspaceTab === "personal"}
                  onClick={() => handleWorkspaceTabChange("personal")}
                >
                  <User size={14} />
                  개인 워크스페이스 ({allMyProjects.length})
                </TabButton>
                <TabButton
                  active={activeWorkspaceTab === "team"}
                  onClick={() => handleWorkspaceTabChange("team")}
                >
                  <Users size={14} />팀 워크스페이스 ({allTeamProjects.length})
                </TabButton> */}
          {/* </TabContainer> */}

          {/* <ScrollableContent>
                {paginatedWorkspace.items.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        activeWorkspaceTab === "team"
                          ? "repeat(auto-fill, minmax(280px, 1fr))"
                          : "repeat(auto-fill, minmax(250px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {paginatedWorkspace.items.map((project) => (
                      <WorkspaceItem
                        key={project.project_id}
                        onMouseEnter={() =>
                          activeWorkspaceTab === "team" &&
                          setHoveredTeam(project.project_id)
                        }
                        onMouseLeave={() => setHoveredTeam(null)}
                      > */}
          {/* 팀 프로젝트인 경우 툴팁 표시 */}
          {/* {activeWorkspaceTab === "team" && project.members && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-10px",
                              left: "50%",
                              transform: "translateX(-50%) translateY(-100%)",
                              background: "#212529",
                              color: "white",
                              padding: "12px",
                              borderRadius: "8px",
                              fontSize: "11px",
                              whiteSpace: "nowrap",
                              opacity:
                                hoveredTeam === project.project_id ? 1 : 0,
                              visibility:
                                hoveredTeam === project.project_id
                                  ? "visible"
                                  : "hidden",
                              transition: "all 0.2s ease",
                              zIndex: 10,
                            }}
                          >
                            <div style={{ marginBottom: "6px" }}>
                              <strong>팀원:</strong>{" "}
                              {project.members.join(", ")}
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
                            <div
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                border: "5px solid transparent",
                                borderTopColor: "#212529",
                              }}
                            />
                          </div>
                        )} */}

          {/* <h4
                          style={{
                            margin: "0 0 8px 0",
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "1.3",
                          }}
                        >
                          {project.project_name}
                        </h4>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            {activeWorkspaceTab === "personal" ? (
                              <User size={10} color={colors.success} />
                            ) : (
                              <>
                                <Users size={10} color={colors.warning} />
                                <span
                                  style={{ fontSize: "11px", color: "#6c757d" }}
                                >
                                  {project.members?.length || 0}명
                                </span>
                              </>
                            )}
                          </div>
                          <span style={{ fontSize: "10px", color: "#6c757d" }}>
                            {project.created_at}
                          </span>
                        </div>
                      </WorkspaceItem>
                    ))}
                  </div>
                ) : (
                  <EmptyState>
                    <div className="icon">
                      {activeWorkspaceTab === "personal" ? "📂" : "👥"}
                    </div>
                    <div className="message">
                      {activeWorkspaceTab === "personal"
                        ? "워크스페이스가 없습니다"
                        : "참여중인 팀 워크스페이스가 없습니다"}
                    </div> */}
          {/* <Button
                      variant={
                        activeWorkspaceTab === "personal"
                          ? "warning"
                          : "primary"
                      }
                      size="small"
                    >
                      <Plus size={14} />
                      {activeWorkspaceTab === "personal"
                        ? "새 워크스페이스"
                        : "팀 만들기"}
                    </Button> */}
          {/* </EmptyState>
                )}
              </ScrollableContent> */}

          {/* {paginatedWorkspace.totalPages > 1 && (
                <Pagination
                  currentPage={workspacePage}
                  totalPages={paginatedWorkspace.totalPages}
                  onPageChange={setWorkspacePage}
                />
              )}
            </FullWidthCard>
          </div> */}
        </ContentGrid>
      </RightPanel>

      {/* 수정 모달 */}
      {showEditModal && (
        <ModalOverlay onClick={handleModalClose}>
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
                <Avatar size="80px" src={getCurrentProfileImage()} editable>
                  {!getCurrentProfileImage() && user.nick?.charAt(0)}
                </Avatar>
                <div>
                  <ImageUploadArea>
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/jpeg,image/jpg,image/png"
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
                        <br />
                        (JPG, PNG, 5MB 이하)
                      </div>
                    </label>
                  </ImageUploadArea>
                </div>
              </div>
              {selectedFile && (
                <div
                  style={{
                    fontSize: "12px",
                    color: colors.success,
                    marginTop: "8px",
                  }}
                >
                  ✓ {selectedFile.name} 선택됨
                </div>
              )}
            </FormGroup>

            <FormGroup>
              <label>닉네임</label>
              <input
                type="text"
                value={editForm.nick || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, nick: e.target.value })
                }
                placeholder="닉네임을 입력하세요"
              />
            </FormGroup>

            <FormGroup>
              <label>성별</label>
              <select
                value={editForm.gender || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, gender: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #dee2e6",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                <option value="">선택하세요</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
                <option value="기타">기타</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>전화번호</label>
              <input
                type="tel"
                value={editForm.phone || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                placeholder="010-1234-5678"
              />
            </FormGroup>

            <FormGroup>
              <label>생년월일</label>
              <input
                type="date"
                value={editForm.dob || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, dob: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <label>주소</label>
              <input
                type="text"
                value={editForm.addr || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, addr: e.target.value })
                }
                placeholder="주소를 입력하세요"
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
                onClick={handleModalClose}
                disabled={isLoading}
              >
                취소
              </Button>
              <Button
                variant="primary"
                onClick={handleEditSubmit}
                disabled={isLoading}
              >
                {isLoading ? "저장 중..." : "저장"}
              </Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default MyPage;
