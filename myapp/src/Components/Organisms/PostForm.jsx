import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Send, X, ArrowLeft } from "lucide-react";
import TitleInput from "../Molecules/susu/TitleInput";
import MediaUpload from "../Molecules/susu/MideaUpload";
import CategorySelect from "../Molecules/susu/CategorySelect";
import ContentEdit from "../Molecules/susu/ContentEdit";
import WorkSpaceSelect from "../Molecules/susu/WorkSpaceSelect"; // WorkSpaceSelect 임포트 유지
import {
  CreatePost,
  GetWorkSpace,
  GetPostById,
  UpdatePost,
} from "../../API/PostApi";

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

const FormCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  overflow: hidden;
`;

const Form = styled.form`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 24px;
    gap: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 16px;
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

const CheckboxContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e9ecef;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: #212529;
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${colors.primary};
    cursor: pointer;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px 32px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;

  @media (max-width: 480px) {
    flex-direction: column;
    padding: 20px;

    button {
      width: 100%;
      justify-content: center;
    }
  }
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
      transform: none;
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
`;

const ValidationMessage = styled.div`
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 12px 16px;
  color: #856404;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PostForm = () => {
  const navigate = useNavigate();
  const { post_id } = useParams(); // post_id 존재 여부로 수정 모드 판단
  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.reducer.user.userInfo);
  const uid = userInfo?.uid;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [fk_workspace_id, setWorkSpaceId] = useState(null);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState([]);
  const [isWorkspaceShared, setIsWorkspaceShared] = useState(false);

  const [existingFiles, setExistingFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  // 워크스페이스 데이터 로드 (게시글 생성 모드일 때만 필요)
  const {
    data,
    isLoading: isWorkspacesLoading,
    isError: isWorkspacesError,
  } = useQuery({
    queryKey: ["workspaces", uid],
    queryFn: () => GetWorkSpace(uid),
    enabled: !post_id, // post_id가 없을 때 (새 게시글 작성 모드)에만 워크스페이스 쿼리 실행
  });

  useEffect(() => {
    if (data?.data) {
      setWorkspaces(data.data);
    }
  }, [data]);

  // 게시글 상세 조회
  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ["post", post_id],
    queryFn: () => GetPostById(post_id),
    enabled: !!post_id, // post_id가 있을 때만 쿼리 실행
  });

  // postData가 변경될 때마다 폼 상태를 업데이트합니다.
  useEffect(() => {
    if (postData && postData.data) {
      const post = postData.data;

      setTitle(post.title || "");
      setContent(post.content || "");
      setCategoryId(post.category_id || "");
      setMainCategory(post.mainCategory || "");
      try {
        setSubCategories(
          post.subCategories ? JSON.parse(post.subCategories) : []
        );
      } catch (e) {
        console.error("Failed to parse subCategories from backend:", e);
        setSubCategories([]);
      }

      const imgPaths = post.imgPaths ? JSON.parse(post.imgPaths) : [];
      const videoPaths = post.videoPaths ? JSON.parse(post.videoPaths) : [];

      setExistingFiles([...imgPaths, ...videoPaths]);
      setFiles([...imgPaths, ...videoPaths]);

      // 수정 모드에서는 워크스페이스 관련 정보를 로드하지 않거나, 초기화합니다.
      // (요구사항에 따라 수정 모드에서 워크스페이스가 나타나지 않아야 하므로)
      setWorkSpaceId(null); // 수정 모드에서는 fk_workspace_id를 null로 초기화
      setIsWorkspaceShared(false); // 수정 모드에서는 공유 안 함으로 설정
      setSelectedPageId([]); // 수정 모드에서는 페이지 선택도 초기화

    } else if (!post_id) {
      // 새로운 게시글 작성 모드일 때 상태 초기화 (기존 로직 유지)
      setTitle("");
      setContent("");
      setCategoryId("");
      setMainCategory("");
      setSubCategories([]);
      setFiles([]);
      setExistingFiles([]);
      setNewFiles([]);
      setWorkSpaceId(null);
      setSelectedPageId([]);
      setIsWorkspaceShared(false);
    }
  }, [postData, post_id]); // post_id 의존성 추가로 모드 변경 감지

  const handleRemoveExistingFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    setExistingFiles((prevExistingFiles) =>
      prevExistingFiles.filter((file) => file !== fileToRemove)
    );
  };

  const createMutation = useMutation({
    mutationFn: CreatePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/main");
    },
    onError: (error) => {
      console.error("게시글 작성 실패:", error);
      alert(
        "게시글 작성에 실패했습니다: " + (error.message || "알 수 없는 오류")
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: UpdatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post_id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(`/detail/${post_id}`);
    },
    onError: (error) => {
      console.error("게시글 수정 실패:", error);
      alert(
        "게시글 수정에 실패했습니다: " + (error.message || "알 수 없는 오류")
      );
    },
  });

  const isFormValid =
    typeof title === "string" &&
    title.trim() !== "" &&
    typeof mainCategory === "string" &&
    mainCategory.trim() !== "" &&
    typeof content === "string" &&
    content.trim() !== "" &&
    (mainCategory === "기타" ||
      (Array.isArray(subCategories) && subCategories.length > 0));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("필수 항목 (제목, 내용, 카테고리)을 모두 입력해주세요.");
      return;
    }

    if (!uid) {
      alert(
        "로그인 정보가 없습니다. 게시글을 작성하거나 수정하려면 로그인해주세요."
      );
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("mainCategory", mainCategory);
    formData.append("subCategories", JSON.stringify(subCategories));
    formData.append("title", title);
    formData.append("uid", uid);
    formData.append("content", content);
    formData.append("category_id", categoryId);
    
    // 수정 모드에서는 isWorkspaceShared, fk_workspace_id, workSpace_pages를 전송하지 않습니다.
    // 또는 서버에서 해당 필드를 무시하도록 처리해야 합니다.
    // 여기서는 isWorkspaceShared가 false로 고정되므로 자연스럽게 빈 값으로 전송됩니다.
    if (!post_id && isWorkspaceShared && fk_workspace_id) { // 새 게시글 작성 모드일 때만 워크스페이스 정보 전송
        formData.append("isWorkspaceShared", isWorkspaceShared);
        formData.append("fk_workspace_id", fk_workspace_id);
        formData.append("workSpace_pages", selectedPageId);
    } else {
        // 새 게시글인데 공유 안 함 또는 워크스페이스 선택 안 함
        // 수정 모드일 때도 이 경로를 타게 됩니다.
        formData.append("isWorkspaceShared", false); // 항상 false로 보내도록 강제
        formData.append("fk_workspace_id", "");
        formData.append("workSpace_pages", "[]"); // 빈 배열 JSON 문자열
    }


    newFiles.forEach((file) => {
      formData.append("media", file);
    });

    formData.append("existingFiles", JSON.stringify(existingFiles));

    if (post_id) {
      updateMutation.mutate({ post_id, formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isPostLoading || isWorkspacesLoading) return <div>로딩 중...</div>;
  if (isPostError || isWorkspacesError)
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <>
      <FormCard>
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>
              {post_id ? "게시글 수정" : "새 게시글 작성"}
            </SectionTitle>

            <TitleInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <CategorySelect
              mainCategory={mainCategory}
              setMainCategory={setMainCategory}
              subCategories={subCategories}
              setSubCategories={setSubCategories}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />

            {/* post_id가 없을 때만 WorkSpaceSelect 컴포넌트를 렌더링 */}
            {!post_id && (
              <WorkSpaceSelect
                workspaces={workspaces}
                selectedWorkspaceId={fk_workspace_id}
                setSelectedWorkspaceId={setWorkSpaceId}
                isWorkspaceShared={isWorkspaceShared}
                setIsWorkspaceShared={setIsWorkspaceShared}
                selectedPageId={selectedPageId}
                setSelectedPageId={setSelectedPageId}
              />
            )}

            <ContentEdit
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <MediaUpload
              files={files}
              setFiles={setFiles}
              setNewFiles={setNewFiles}
              existingFiles={existingFiles}
              onRemoveExistingFile={handleRemoveExistingFile}
            />
          </FormSection>

          {!isFormValid && (
            <ValidationMessage>
              <X size={16} /> 필수 항목 (제목, 내용, 카테고리)을 모두 입력해주세요.
            </ValidationMessage>
          )}

          <ButtonGroup>
            <StyledButton
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} />
              취소
            </StyledButton>

            <StyledButton
              type="submit"
              variant="primary"
              disabled={
                !isFormValid ||
                createMutation.isLoading ||
                updateMutation.isLoading
              }
            >
              {post_id ? (
                <>
                  <Send size={16} />
                  수정하기
                </>
              ) : (
                <>
                  <Send size={16} />
                  작성하기
                </>
              )}
            </StyledButton>
          </ButtonGroup>
        </Form>
      </FormCard>
    </>
  );
};

export default PostForm;