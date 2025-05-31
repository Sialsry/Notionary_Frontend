import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Send, X, ArrowLeft } from "lucide-react";
import TitleInput from "../Molecules/susu/TitleInput";
import MediaUpload from "../Molecules/susu/MideaUpload";
import CategorySelect from "../Molecules/susu/CategorySelect";
import ContentEdit from "../Molecules/susu/ContentEdit";
import Button from "../Atoms/susu/Button";
import { CreatePost, GetWorkSpace } from "../../API/PostApi";
import WorkSpaceSelect from "../Molecules/susu/WorkSpaceSelect";

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
  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.user.userInfo);
  const uid = userInfo?.uid;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [fk_workspace_id, setWorkSpaceId] = useState(null);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [isWorkspaceShared, setIsWorkspaceShared] = useState(false);

  const {
    data,
    isLoading: isWorkspacesLoading,
    isError: isWorkspacesError,
  } = useQuery({
    queryKey: ["workspaces", uid],
    queryFn: () => GetWorkSpace(uid),
  });

  const workspaces = data?.data || [];

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: CreatePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/main");
    },
    onError: (error) => {
      console.log(error);
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
      (Array.isArray(subCategories) && subCategories.length > 0)) &&
    (!isWorkspaceShared ||
      (fk_workspace_id &&
        selectedPageId &&
        (Array.isArray(selectedPageId) ? selectedPageId.length > 0 : true)));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("제목, 대표 카테고리, 세부 카테고리, 내용을 모두 입력해주세요.");
      return;
    }

    if (!categoryId && mainCategory !== "기타") {
      alert("세부 카테고리를 선택해주세요.");
      return;
    }

    if (isWorkspaceShared) {
      if (
        !fk_workspace_id ||
        !selectedPageId ||
        (Array.isArray(selectedPageId) && selectedPageId.length === 0)
      ) {
        alert(
          "워크스페이스에 게시글을 공유하려면 워크스페이스 및 페이지를 선택하세요."
        );
        return;
      }
    }

    const formData = new FormData();
    formData.append("mainCategory", mainCategory);
    formData.append("subCategories", subCategories.join(","));
    formData.append("uid", uid);
    formData.append("category_id", categoryId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("isWorkspaceShared", isWorkspaceShared);

    if (isWorkspaceShared) {
      formData.append("fk_workspace_id", fk_workspace_id);
      formData.append(
        "selectedPageIds",
        Array.isArray(selectedPageId)
          ? selectedPageId.join(",")
          : selectedPageId
      );
    } else {
      formData.append("fk_workspace_id", "");
      formData.append("selectedPageIds", "");
    }

    files.forEach((file) => {
      formData.append("media", file);
    });

    mutate(formData);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/main");
  };

  return (
    <FormCard>
      <Form onSubmit={handleSubmit} id="postForm">
        <FormSection>
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormSection>

        <FormSection>
          <MediaUpload onFileSelect={(newFiles) => setFiles(newFiles)} />
        </FormSection>

        <FormSection>
          <CategorySelect
            onCategoryChange={(main, subs) => {
              setMainCategory(main);
              setSubCategories(subs);
              setCategoryId(main === "기타" ? 6 : subs[0] || null);
            }}
          />
        </FormSection>

        <CheckboxContainer>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={isWorkspaceShared}
              onChange={(e) => setIsWorkspaceShared(e.target.checked)}
            />
            워크스페이스에 게시글 공유하기
          </CheckboxLabel>
        </CheckboxContainer>

        {!isWorkspacesLoading && !isWorkspacesError && isWorkspaceShared && (
          <FormSection>
            <WorkSpaceSelect
              workspaces={workspaces}
              value={selectedPageId}
              onChange={(pageId, workspaceId) => {
                setSelectedPageId(pageId);
                setSelectedWorkspaceId(
                  workspaceId ? Number(workspaceId) : null
                );
                setWorkSpaceId(workspaceId ? Number(workspaceId) : null);
              }}
            />
          </FormSection>
        )}

        <FormSection>
          <ContentEdit
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormSection>

        {!isFormValid && (title || content || mainCategory) && (
          <ValidationMessage>
            ⚠️ 모든 필수 항목을 입력해주세요.
          </ValidationMessage>
        )}
      </Form>

      <ButtonGroup>
        <StyledButton variant="secondary" onClick={handleCancel} type="button">
          <ArrowLeft size={16} />
          취소
        </StyledButton>
        <StyledButton
          variant="primary"
          type="submit"
          form="postForm"
          disabled={!isFormValid || isSubmitting}
        >
          <Send size={16} />
          {isSubmitting ? "등록 중..." : "질문 등록"}
        </StyledButton>
      </ButtonGroup>
    </FormCard>
  );
};

export default PostForm;
