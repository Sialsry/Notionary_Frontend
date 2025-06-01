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
import WorkspaceSelect from "../Molecules/susu/WorkSpaceSelect";
import {
  CreatePost,
  GetWorkSpace,
  GetPostById,
  UpdatePost,
} from "../../API/PostApi";
import WorkSpaceSelector from "../Molecules/susu/WorkSpaceSelect";

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
  const { post_id } = useParams();
  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.reducer.user.userInfo);
  const uid = userInfo?.uid;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [fk_workspace_id, setWorkSpaceId] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [workspaces, setWorkspaces] = useState([]); // 워크스페이스 목록 상태
  const [selectedPageId, setSelectedPageId] = useState([]);
  const [isWorkspaceShared, setIsWorkspaceShared] = useState(false);
  const [grouped, setGrouped] = useState(false); // 워크스페이스 그룹화 여부 상태

  const [existingFiles, setExistingFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  // const [fk_workspace_id, setWorkSpaceId] = useState(null); // 워크스페이스 관련 상태가 필요하다면 유지

  const {
    data,
    isLoading: isWorkspacesLoading,
    isError: isWorkspacesError,
  } = useQuery({
    queryKey: ["workspaces", uid],
    queryFn: () => GetWorkSpace(uid),
  });

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
    } else if (!post_id) {
      // 새로운 게시글 작성 모드일 때 상태 초기화
      setTitle("");
      setContent("");
      setCategoryId("");
      setMainCategory("");
      setSubCategories([]);
      setFiles([]);
      setExistingFiles([]);
      setNewFiles([]);
    }
  }, [postData, post_id]);

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
      queryClient.invalidateQueries({ queryKey: ["post", post_id] }); // 수정된 특정 게시글 상세 데이터 무효화
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // 게시글 목록 데이터 무효화 (선택 사항)
      navigate(`/detail/${post_id}`); // <-- 현재 수정 중인  게시글의 post_id를 사용하여 이동
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
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    // UID 유효성 검사 추가
    if (!uid) {
      alert(
        "로그인 정보가 없습니다. 게시글을 작성하거나 수정하려면 로그인해주세요."
      );
      navigate("/login"); // 로그인 페이지로 리디렉션하거나 적절한 처리
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("uid", uid); // uid 추가
    formData.append("content", content);
    formData.append("isWorkspaceShared", isWorkspaceShared);

    if (isWorkspaceShared) {
      formData.append("fk_workspace_id", fk_workspace_id);
      formData.append("workSpace_pages", selectedPageId);
      // formData.append(
      //   "selectedPageIds",
      //   Array.isArray(selectedPageId)
      //     ? selectedPageId.join(",")
      //     : selectedPageId
      // );
    } else {
      formData.append("fk_workspace_id", "");
      formData.append("selectedPageIds", "");
    }

    newFiles.forEach((file) => {
      formData.append("media", file); // Multer가 'media' 필드를 기대하므로 일치시킵니다.
    });

    formData.append("existingFiles", JSON.stringify(existingFiles));

    if (post_id) {
      updateMutation.mutate({ post_id, formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isPostLoading) return <div>로딩 중...</div>;
  if (isPostError)
    return <div>게시글 정보를 불러오는 중 오류가 발생했습니다.</div>;

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

            <WorkSpaceSelector
              workspaces={workspaces}
              selectedWorkspaceId={fk_workspace_id}
              setSelectedWorkspaceId={setWorkSpaceId}
              isWorkspaceShared={isWorkspaceShared}
              setIsWorkspaceShared={setIsWorkspaceShared}
              selectedPageId={selectedPageId}
              setSelectedPageId={setSelectedPageId} // 이 부분이 누락되었거나 잘못됨
            />

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
              <X size={16} /> 필수 항목을 모두 입력해주세요.
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
