import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Edit3,
  Trash2,
  Send,
  ChevronLeft,
  ChevronRight,
  Play,
  User,
  Calendar,
  Tag,
  MoreHorizontal,
} from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "../../images/notionary-logo.png";

// 컬러 팔레트 (MyPage와 동일)
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

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Header = styled.div`
  background: white;
  padding: 16px 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: none;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  color: ${colors.primary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.primary};
    color: white;
  }
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const PostCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 24px;
`;

const PostHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f1f3f4;
`;

const PostTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 16px 0;
  line-height: 1.3;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${colors.gradient};
  background-image: ${(props) => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: #212529;
  font-size: 16px;
`;

const PostDate = styled.span`
  color: #6c757d;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CategoryBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${colors.gradientInfo};
  color: white;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PostActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === "edit" &&
    `
    background: ${colors.gradientSuccess};
    color: white;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
    }
  `}

  ${(props) =>
    props.variant === "delete" &&
    `
    background: ${colors.danger};
    color: white;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(253, 121, 168, 0.3);
    }
  `}
`;

const MediaContainer = styled.div`
  position: relative;
  max-height: 500px;
  overflow: hidden;
`;

const MediaSlider = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(-${(props) => props.currentIndex * 100}%);
`;

const MediaItem = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const Video = styled.video`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  ${(props) => props.direction === "left" && "left: 16px;"}
  ${(props) => props.direction === "right" && "right: 16px;"}
`;

const MediaIndicator = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const Indicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? "white" : "rgba(255, 255, 255, 0.5)"};
  transition: all 0.2s ease;
`;

const PostContent = styled.div`
  padding: 24px;
`;

const ContentText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #212529;
  white-space: pre-wrap;
  margin-bottom: 24px;
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-top: 1px solid #f1f3f4;
  background: #f8f9fa;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid ${(props) => (props.isLiked ? colors.danger : "#dee2e6")};
  background: ${(props) => (props.isLiked ? colors.danger : "white")};
  color: ${(props) => (props.isLiked ? "white" : "#6c757d")};
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.danger};
    background: ${(props) => (props.isLiked ? colors.danger : "#fff5f5")};
    color: ${colors.danger};
    transform: translateY(-1px);
  }
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6c757d;
  font-weight: 600;
`;

const CommentsSection = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const CommentsHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f1f3f4;
  background: #f8f9fa;
`;

const CommentsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentForm = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f1f3f4;
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const CommentSubmit = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${colors.gradient};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CommentsList = styled.div`
  max-height: 600px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.primary};
    border-radius: 4px;
  }
`;

const CommentItem = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f1f3f4;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SmallAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${colors.gradient};
  background-image: ${(props) => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
`;

const CommentAuthorName = styled.span`
  font-weight: 600;
  color: #212529;
  font-size: 14px;
`;

const CommentDate = styled.span`
  color: #6c757d;
  font-size: 12px;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 8px;
`;

const CommentActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: none;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 12px;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;

const CommentContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #212529;
  white-space: pre-wrap;
`;

const EditCommentInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  margin-top: 8px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const EditCommentActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const EditButton = styled.button`
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === "save" &&
    `
    background: ${colors.success};
    color: white;
    &:hover {
      background: #3dd5c8;
    }
  `}

  ${(props) =>
    props.variant === "cancel" &&
    `
    background: #f8f9fa;
    color: #6c757d;
    border: 1px solid #dee2e6;
    &:hover {
      background: #e9ecef;
    }
  `}
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #6c757d;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: ${colors.danger};
  text-align: center;
`;

// 메인 컴포넌트
const PostDetail = () => {
  const { post_id } = useParams();
  const navigate = useNavigate();

  // 상태 관리
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  // 게시글 데이터 가져오기
  const fetchPost = async () => {
    try {
      setLoading(true);
      const token =
        Cookies.get("authToken") || Cookies.get("login_access_token");

      const response = await axios.get(
        `http://localhost:4000/detail/${post_id}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );

      console.log(response.data.data, "response.data.data");
      console.log(response.data.data.images, "response.data.data.images");

      response.data.data.images = response.data.data.images.map((imgString) => {
        const match = imgString.match(/"(http[^"]+)"/);
        return match ? match[1] : imgString;
      });
      response.data.data.videos = response.data.data.videos.map((vidString) => {
        const match = vidString.match(/"(http[^"]+)"/);
        return match ? match[1] : vidString;
      });

      console.log(response.data.data, "가공된 이미지들");

      setPost(response.data.data);
      setError(null);
    } catch (error) {
      console.error("게시글 조회 실패:", error);
      setError("게시글을 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [post_id]);

  // 좋아요 토글
  const handleLikeToggle = async () => {
    try {
      const token =
        Cookies.get("authToken") || Cookies.get("login_access_token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/detail/${post_id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setPost((prev) => ({
        ...prev,
        isLiked: response.data.data.isLiked,
        hearts: response.data.data.hearts,
      }));
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      setSubmittingComment(true);
      const token =
        Cookies.get("authToken") || Cookies.get("login_access_token");

      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/detail/${post_id}/comments`,
        { content: newComment.trim() },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, response.data.data],
      }));
      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    } finally {
      setSubmittingComment(false);
    }
  };

  // 댓글 수정 시작
  const startEditingComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(currentContent);
  };

  // 댓글 수정 취소
  const cancelEditingComment = () => {
    setEditingCommentId(null);
    setEditingCommentContent("");
  };

  // 댓글 수정 저장
  const saveEditingComment = async (commentId) => {
    if (!editingCommentContent.trim()) return;

    try {
      const token =
        Cookies.get("authToken") || Cookies.get("login_access_token");

      await axios.put(
        `http://localhost:4000/detail/comments/${commentId}`,
        { content: editingCommentContent.trim() },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setPost((prev) => ({
        ...prev,
        comments: prev.comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editingCommentContent.trim() }
            : comment
        ),
      }));

      setEditingCommentId(null);
      setEditingCommentContent("");
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      const token =
        Cookies.get("authToken") || Cookies.get("login_access_token");

      await axios.delete(`http://localhost:4000/detail/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setPost((prev) => ({
        ...prev,
        comments: prev.comments.filter((comment) => comment.id !== commentId),
      }));
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  // 게시글 삭제
  const deletePost = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;

    try {
      const token =
        Cookies.get("authToken") || Cookies.get("login_access_token");

      await axios.delete(`http://localhost:4000/detail/${post_id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      alert("게시글이 삭제되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  // 미디어 슬라이더 제어
  const nextMedia = () => {
    const totalMedia =
      (post?.images?.length || 0) + (post?.videos?.length || 0);
    setCurrentMediaIndex((prev) => (prev + 1) % totalMedia);
  };

  const prevMedia = () => {
    const totalMedia =
      (post?.images?.length || 0) + (post?.videos?.length || 0);
    setCurrentMediaIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
  };

  // console.log(post.images, "post.images");
  // 전체 미디어 배열 생성
  const allMedia = [
    ...(post?.images || []).map((img) => ({ type: "image", src: img })),
    ...(post?.videos || []).map((vid) => ({ type: "video", src: vid })),
  ];
  //const allMedia = [...post.images, ...post.videos];

  //   const processedImgs = post.images.map((imgString) => {
  //   // 따옴표로 감싸진 URL 추출
  //   const match = imgString.match(/"(http[^"]+)"/);
  //   return match ? match[1] : imgString;
  // });

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>게시글을 불러오는 중...</LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <ErrorMessage>게시글을 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BackButton onClick={() => navigate("/mypage")}>
            <ArrowLeft size={16} />
            마이페이지
          </BackButton>
          <Logo
            src={logo}
            alt="Notionary Logo"
            onClick={() => navigate("/main")}
          />
        </HeaderLeft>
      </Header>

      <Content>
        <PostCard>
          <PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <PostMeta>
              <AuthorInfo>
                <Avatar src={post.author.profImg}>
                  {!post.author.profImg && post.author.nick?.charAt(0)}
                </Avatar>
                <AuthorDetails>
                  <AuthorName>{post.author.nick}</AuthorName>
                  <PostDate>
                    <Calendar size={12} />
                    {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </PostDate>
                </AuthorDetails>
              </AuthorInfo>

              <CategoryBadge>
                <Tag size={12} />
                {post.category.parent_category &&
                  `${post.category.parent_category} > `}
                {post.category.category_name}
              </CategoryBadge>

              {post.isMyPost && (
                <PostActions>
                  <ActionButton
                    variant="edit"
                    onClick={() => navigate(`/post/edit/${post.post_id}`)}
                  >
                    <Edit3 size={14} />
                    수정
                  </ActionButton>
                  <ActionButton variant="delete" onClick={deletePost}>
                    <Trash2 size={14} />
                    삭제
                  </ActionButton>
                </PostActions>
              )}
            </PostMeta>
          </PostHeader>

          {/* 미디어 슬라이더 */}

          {allMedia.length > 0 && (
            <MediaContainer>
              <MediaSlider currentIndex={currentMediaIndex}>
                {allMedia.map((media, index) => (
                  <MediaItem key={index}>
                    {media.type === "image" ? (
                      <Image
                        src={media.src}
                        alt={`게시글 이미지 ${index + 1}`}
                      />
                    ) : (
                      <Video src={media.src} controls>
                        <source src={media.src} />
                        브라우저가 비디오를 지원하지 않습니다.
                      </Video>
                    )}
                  </MediaItem>
                ))}
              </MediaSlider>

              {allMedia.length > 1 && (
                <>
                  <SliderButton direction="left" onClick={prevMedia}>
                    <ChevronLeft size={20} />
                  </SliderButton>
                  <SliderButton direction="right" onClick={nextMedia}>
                    <ChevronRight size={20} />
                  </SliderButton>
                  <MediaIndicator>
                    {allMedia.map((_, index) => (
                      <Indicator
                        key={index}
                        active={index === currentMediaIndex}
                      />
                    ))}
                  </MediaIndicator>
                </>
              )}
            </MediaContainer>
          )}

          <PostContent>
            <ContentText>{post.content}</ContentText>
          </PostContent>

          <PostStats>
            <LikeButton isLiked={post.isLiked} onClick={handleLikeToggle}>
              <Heart size={16} fill={post.isLiked ? "currentColor" : "none"} />
              {post.hearts}
            </LikeButton>
            <CommentCount>
              <MessageCircle size={16} />
              댓글 {post.comments.length}개
            </CommentCount>
          </PostStats>
        </PostCard>

        <CommentsSection>
          <CommentsHeader>
            <CommentsTitle>
              <MessageCircle size={18} />
              댓글 {post.comments.length}개
            </CommentsTitle>
          </CommentsHeader>

          <CommentForm>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 작성해주세요..."
              maxLength={200}
            />
            <CommentSubmit
              onClick={handleCommentSubmit}
              disabled={submittingComment || !newComment.trim()}
            >
              <Send size={14} />
              {submittingComment ? "작성 중..." : "댓글 작성"}
            </CommentSubmit>
          </CommentForm>

          <CommentsList>
            {post.comments.map((comment) => (
              <CommentItem key={comment.id}>
                <CommentHeader>
                  <CommentAuthor>
                    <SmallAvatar src={comment.author.profImg}>
                      {!comment.author.profImg &&
                        comment.author.nick?.charAt(0)}
                    </SmallAvatar>
                    <div>
                      <CommentAuthorName>
                        {comment.author.nick}
                      </CommentAuthorName>
                      <CommentDate>
                        {new Date(comment.createdAt).toLocaleDateString(
                          "ko-KR",
                          {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </CommentDate>
                    </div>
                  </CommentAuthor>

                  {comment.isMyComment && (
                    <CommentActions>
                      <CommentActionButton
                        onClick={() =>
                          startEditingComment(comment.id, comment.content)
                        }
                      >
                        <Edit3 size={12} />
                        수정
                      </CommentActionButton>
                      <CommentActionButton
                        onClick={() => deleteComment(comment.id)}
                      >
                        <Trash2 size={12} />
                        삭제
                      </CommentActionButton>
                    </CommentActions>
                  )}
                </CommentHeader>

                {editingCommentId === comment.id ? (
                  <>
                    <EditCommentInput
                      value={editingCommentContent}
                      onChange={(e) => setEditingCommentContent(e.target.value)}
                      maxLength={200}
                    />
                    <EditCommentActions>
                      <EditButton
                        variant="save"
                        onClick={() => saveEditingComment(comment.id)}
                      >
                        저장
                      </EditButton>
                      <EditButton
                        variant="cancel"
                        onClick={cancelEditingComment}
                      >
                        취소
                      </EditButton>
                    </EditCommentActions>
                  </>
                ) : (
                  <CommentContent>{comment.content}</CommentContent>
                )}
              </CommentItem>
            ))}
          </CommentsList>
        </CommentsSection>
      </Content>
    </Container>
  );
};

export default PostDetail;
