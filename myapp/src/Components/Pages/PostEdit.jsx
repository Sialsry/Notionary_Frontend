import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Edit3, ArrowLeft, Save, X, Trash2 } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "../../images/notionary-logo.png";

// 컬러 팔레트 (통일성 유지)
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

// Styled Components (게시글 작성 페이지와 동일)
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
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
`;

const HeaderCard = styled.div`
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

const FormCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  overflow: hidden;
`;

const StyledForm = styled.form`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 24px;
    gap: 20px;
  }
`;

const FormSection = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid ${colors.primary};
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ExistingMediaSection = styled.div`
  margin-top: 16px;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 12px;
`;

const MediaItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MediaImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

const MediaVideo = styled.video`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

const RemoveMediaButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.danger};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 24px 32px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const LeftButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const RightButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  justify-content: center;

  ${(props) =>
    props.variant === "primary" &&
    `
    background: ${colors.gradient};
    color: white;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background: #f8f9fa;
    color: #495057;
    border: 2px solid #dee2e6;
    
    &:hover {
      background: #e9ecef;
      border-color: ${colors.primary};
      color: ${colors.primary};
    }
  `}

  ${(props) =>
    props.variant === "danger" &&
    `
    background: ${colors.danger};
    color: white;
    
    &:hover {
      background: #e91e63;
      transform: translateY(-1px);
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

const PostEdit = () => {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.user.userInfo);

  // 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [isWorkspaceShared, setIsWorkspaceShared] = useState(false);
  const [fkWorkspaceId, setFkWorkspaceId] = useState(null);
  const [selectedPageIds, setSelectedPageIds] = useState([]);

  // 미디어 파일 상태
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [removedVideos, setRemovedVideos] = useState([]);

  // 기존 게시글 데이터 가져오기
  const {
    data: postData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["postEdit", post_id],
    queryFn: async () => {
      const token =
        Cookies.get("authToken") || Cookies.get("login_access_token");
      const response = await axios.get(
        `http://localhost:4000/post/${post_id}/edit`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      // 폼 데이터 설정
      setTitle(data.title);
      setContent(data.content);
      setCategoryId(data.category.category_id);
      setExistingImages(data.images || []);
      setExistingVideos(data.videos || []);
      setIsWorkspaceShared(data.hasWorkspaceSharing);
      setFkWorkspaceId(data.fk_workspace_id);

      // 연결된 페이지 ID들 설정
      const pageIds =
        data.connectedPages?.map((page) => page.workspace_id) || [];
      setSelectedPageIds(pageIds);

      // 카테고리 정보 설정
      if (data.category.parent_category) {
        setMainCategory(data.category.parent_category);
        setSubCategories([data.category.category_id]);
      } else {
        setMainCategory(data.category.category_name);
        setSubCategories([]);
      }
    },
  });

  // 게시글 수정 mutation
  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      const token =
        Cookies.get("authToken") || Cookies.get("login_access_token");
      const response = await axios.put(
        `http://localhost:4000/post/${post_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post", post_id]);
      queryClient.invalidateQueries(["posts"]);
      alert("게시글이 성공적으로 수정되었습니다!");
      navigate(`/post/${post_id}`);
    },
    onError: (error) => {
      console.error("게시글 수정 실패:", error);
      alert(
        `게시글 수정에 실패했습니다: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  // 기존 미디어 제거
  const removeExistingImage = (imageUrl) => {
    setExistingImages((prev) => prev.filter((img) => img !== imageUrl));
    setRemovedImages((prev) => [...prev, imageUrl]);
  };

  const removeExistingVideo = (videoUrl) => {
    setExistingVideos((prev) => prev.filter((vid) => vid !== videoUrl));
    setRemovedVideos((prev) => [...prev, videoUrl]);
  };

  // 새 파일 추가
  const handleNewFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...files]);
  };

  // 새 파일 제거
  const removeNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", categoryId);
    formData.append("isWorkspaceShared", isWorkspaceShared);

    if (isWorkspaceShared && fkWorkspaceId) {
      formData.append("fk_workspace_id", fkWorkspaceId);
      formData.append("selectedPageIds", selectedPageIds.join(","));
    }

    // 유지할 기존 파일들
    const keepImages = existingImages.filter(
      (img) => !removedImages.includes(img)
    );
    const keepVideos = existingVideos.filter(
      (vid) => !removedVideos.includes(vid)
    );

    formData.append("keepExistingImages", keepImages.join(","));
    formData.append("keepExistingVideos", keepVideos.join(","));

    // 새 파일들 추가
    newFiles.forEach((file) => {
      formData.append("media", file);
    });

    updateMutation.mutate(formData);
  };

  // 게시글 삭제
  const handleDelete = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
      const token =
        Cookies.get("authToken") || Cookies.get("login_access_token");
      await axios.delete(`http://localhost:4000/post/${post_id}`, {
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

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner>게시글 데이터를 불러오는 중...</LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <BackButton onClick={() => navigate(`/post/${post_id}`)}>
              <ArrowLeft size={16} />
              뒤로가기
            </BackButton>
          </HeaderLeft>
        </Header>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            color: colors.danger,
            fontSize: "16px",
          }}
        >
          게시글을 불러올 수 없습니다. 수정 권한이 없거나 존재하지 않는
          게시글입니다.
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BackButton onClick={() => navigate(`/post/${post_id}`)}>
            <ArrowLeft size={16} />
            게시글로 돌아가기
          </BackButton>
          <Logo
            src={logo}
            alt="Notionary Logo"
            onClick={() => navigate("/main")}
          />
        </HeaderLeft>
      </Header>

      <Content>
        <HeaderCard>
          <PageTitle>
            <Edit3 size={32} color={colors.primary} />
            게시글 수정하기
          </PageTitle>
          <PageSubtitle>게시글 정보를 수정하고 저장하세요.</PageSubtitle>
        </HeaderCard>

        <FormCard>
          <StyledForm onSubmit={handleSubmit}>
            {/* 제목 입력 */}
            <FormSection>
              <SectionTitle>제목</SectionTitle>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="게시글 제목을 입력하세요"
                maxLength={100}
                required
              />
            </FormSection>

            {/* 기존 미디어 파일 관리 */}
            {(existingImages.length > 0 || existingVideos.length > 0) && (
              <FormSection>
                <SectionTitle>기존 첨부 파일</SectionTitle>

                {existingImages.length > 0 && (
                  <ExistingMediaSection>
                    <h4
                      style={{
                        margin: "0 0 12px 0",
                        fontSize: "14px",
                        color: "#495057",
                      }}
                    >
                      이미지 ({existingImages.length}개)
                    </h4>
                    <MediaGrid>
                      {existingImages.map((imageUrl, index) => (
                        <MediaItem key={index}>
                          <MediaImage
                            src={imageUrl}
                            alt={`기존 이미지 ${index + 1}`}
                          />
                          <RemoveMediaButton
                            type="button"
                            onClick={() => removeExistingImage(imageUrl)}
                            title="이미지 삭제"
                          >
                            <X size={14} />
                          </RemoveMediaButton>
                        </MediaItem>
                      ))}
                    </MediaGrid>
                  </ExistingMediaSection>
                )}

                {existingVideos.length > 0 && (
                  <ExistingMediaSection>
                    <h4
                      style={{
                        margin: "16px 0 12px 0",
                        fontSize: "14px",
                        color: "#495057",
                      }}
                    >
                      동영상 ({existingVideos.length}개)
                    </h4>
                    <MediaGrid>
                      {existingVideos.map((videoUrl, index) => (
                        <MediaItem key={index}>
                          <MediaVideo src={videoUrl} controls />
                          <RemoveMediaButton
                            type="button"
                            onClick={() => removeExistingVideo(videoUrl)}
                            title="동영상 삭제"
                          >
                            <X size={14} />
                          </RemoveMediaButton>
                        </MediaItem>
                      ))}
                    </MediaGrid>
                  </ExistingMediaSection>
                )}
              </FormSection>
            )}

            {/* 새 미디어 파일 추가 */}
            <FormSection>
              <SectionTitle>새 파일 추가</SectionTitle>
              <div style={{ marginBottom: "12px" }}>
                <input
                  type="file"
                  id="new-media-upload"
                  accept="image/*,video/mp4"
                  multiple
                  onChange={handleNewFileUpload}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="new-media-upload"
                  style={{
                    display: "inline-block",
                    padding: "12px 20px",
                    background: colors.gradientInfo,
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                  }}
                >
                  파일 선택
                </label>
              </div>

              {newFiles.length > 0 && (
                <ExistingMediaSection>
                  <h4
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: "14px",
                      color: "#495057",
                    }}
                  >
                    새로 추가할 파일 ({newFiles.length}개)
                  </h4>
                  <MediaGrid>
                    {newFiles.map((file, index) => (
                      <MediaItem key={index}>
                        {file.type.startsWith("image/") ? (
                          <MediaImage
                            src={URL.createObjectURL(file)}
                            alt={`새 이미지 ${index + 1}`}
                          />
                        ) : (
                          <MediaVideo
                            src={URL.createObjectURL(file)}
                            controls
                          />
                        )}
                        <RemoveMediaButton
                          type="button"
                          onClick={() => removeNewFile(index)}
                          title="파일 제거"
                        >
                          <X size={14} />
                        </RemoveMediaButton>
                      </MediaItem>
                    ))}
                  </MediaGrid>
                </ExistingMediaSection>
              )}
            </FormSection>

            {/* 카테고리 선택 */}
            <FormSection>
              <SectionTitle>카테고리</SectionTitle>
              <div
                style={{
                  padding: "16px",
                  background: "white",
                  borderRadius: "8px",
                }}
              >
                <p style={{ margin: "0", fontSize: "14px", color: "#6c757d" }}>
                  현재 카테고리:{" "}
                  <strong>{postData?.category?.category_name}</strong>
                  {postData?.category?.parent_category && (
                    <span>
                      {" "}
                      ({postData.category.parent_category}{" "}
                      {postData.category.category_name})
                    </span>
                  )}
                </p>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    fontSize: "12px",
                    color: "#868e96",
                  }}
                >
                  카테고리 변경은 추후 업데이트 예정입니다.
                </p>
              </div>
            </FormSection>

            {/* 워크스페이스 공유 */}
            <FormSection>
              <SectionTitle>워크스페이스 공유</SectionTitle>
              <div
                style={{
                  padding: "16px",
                  background: "white",
                  borderRadius: "8px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isWorkspaceShared}
                    onChange={(e) => setIsWorkspaceShared(e.target.checked)}
                    style={{ width: "18px", height: "18px" }}
                  />
                  <span style={{ fontWeight: "600", color: "#212529" }}>
                    워크스페이스에 게시글 공유하기
                  </span>
                </label>

                {isWorkspaceShared && postData?.connectedPages && (
                  <div
                    style={{
                      marginTop: "16px",
                      padding: "12px",
                      background: "#f8f9fa",
                      borderRadius: "6px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      현재 연결된 페이지:
                    </p>
                    {postData.connectedPages.map((page, index) => (
                      <p
                        key={index}
                        style={{
                          margin: "4px 0",
                          fontSize: "13px",
                          color: "#495057",
                        }}
                      >
                        • {page.workspace_name} - {page.page_name}
                      </p>
                    ))}
                    <p
                      style={{
                        margin: "8px 0 0 0",
                        fontSize: "12px",
                        color: "#868e96",
                      }}
                    >
                      워크스페이스 연결 수정은 추후 업데이트 예정입니다.
                    </p>
                  </div>
                )}
              </div>
            </FormSection>

            {/* 내용 입력 */}
            <FormSection>
              <SectionTitle>내용</SectionTitle>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="게시글 내용을 입력하세요"
                maxLength={1000}
                required
              />
              <div
                style={{
                  textAlign: "right",
                  fontSize: "12px",
                  color: "#6c757d",
                  marginTop: "8px",
                }}
              >
                {content.length} / 1000
              </div>
            </FormSection>
          </StyledForm>

          <ButtonGroup>
            <LeftButtons>
              <StyledButton
                variant="danger"
                type="button"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                게시글 삭제
              </StyledButton>
            </LeftButtons>

            <RightButtons>
              <StyledButton
                variant="secondary"
                type="button"
                onClick={() => navigate(`/post/${post_id}`)}
              >
                <X size={16} />
                취소
              </StyledButton>
              <StyledButton
                variant="primary"
                type="button"
                onClick={handleSubmit}
                disabled={
                  updateMutation.isLoading || !title.trim() || !content.trim()
                }
              >
                <Save size={16} />
                {updateMutation.isLoading ? "저장 중..." : "변경사항 저장"}
              </StyledButton>
            </RightButtons>
          </ButtonGroup>
        </FormCard>
      </Content>
    </Container>
  );
};

export default PostEdit;
