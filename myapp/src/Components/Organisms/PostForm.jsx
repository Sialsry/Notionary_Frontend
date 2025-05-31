import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TitleInput from "../Molecules/susu/TitleInput";
import MediaUpload from "../Molecules/susu/MideaUpload";
import CategorySelect from "../Molecules/susu/CategorySelect";
import ContentEdit from "../Molecules/susu/ContentEdit";
import Button from "../Atoms/susu/Button";
import { CreatePost, GetWorkSpace } from "../../API/PostApi";
import WorkSpaceSelect from "../Molecules/susu/WorkSpaceSelect";

const Form = styled.form`
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
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

  const { mutate } = useMutation({
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
      console.log("fk_workspace_id:", fk_workspace_id);
      formData.append(
        "selectedPageIds",
        Array.isArray(selectedPageId)
          ? selectedPageId.join(",")
          : selectedPageId
      );
    } else {
      formData.append("fk_workspace_id", ""); // null 대신 빈 문자열로 수정
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
    <Form onSubmit={handleSubmit}>
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />

      <MediaUpload onFileSelect={(newFiles) => setFiles(newFiles)} />

      <CategorySelect
        onCategoryChange={(main, subs) => {
          setMainCategory(main);
          setSubCategories(subs);
          setCategoryId(main === "기타" ? 6 : subs[0] || null);
        }}
      />

      <CheckboxLabel>
        <input
          type="checkbox"
          checked={isWorkspaceShared}
          onChange={(e) => setIsWorkspaceShared(e.target.checked)}
        />
        워크스페이스에 게시글 공유하기
      </CheckboxLabel>

      {!isWorkspacesLoading && !isWorkspacesError && isWorkspaceShared && (
        <WorkSpaceSelect
          workspaces={workspaces}
          value={selectedPageId}
          onChange={(pageId, workspaceId) => {
            console.log("onChange workspaceId:", workspaceId);
            setSelectedPageId(pageId);
            setSelectedWorkspaceId(workspaceId ? Number(workspaceId) : null);
            setWorkSpaceId(workspaceId ? Number(workspaceId) : null);
          }}
        />
      )}

      <ContentEdit
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <ButtonGroup>
        <Button onClick={handleCancel} type="button">
          취소
        </Button>
        <Button type="submit" disabled={!isFormValid}>
          질문 등록
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default PostForm;
