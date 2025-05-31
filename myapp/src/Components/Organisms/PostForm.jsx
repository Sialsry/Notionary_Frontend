import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TitleInput from "../Molecules/susu/TitleInput";
import MediaUpload from "../Molecules/susu/MideaUpload";
import CategorySelect from "../Molecules/susu/CategorySelect";
import ContentEdit from "../Molecules/susu/ContentEdit";
import Button from "../Atoms/susu/Button";
import { CreatePost } from "../../API/PostApi";

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

const QuestionForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.user.userInfo);
  // console.log(userInfo)
  const uid = userInfo?.uid;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [files, setFiles] = useState([]);

  const { mutate } = useMutation({
    mutationFn: CreatePost,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["posts"]);
      navigate("/main");
    },
    onError: (data) => {
      console.log(data);
    },
  });
  const isFormValid =
    typeof mainCategory === "string" &&
    mainCategory.trim() !== "" &&
    typeof content === "string" &&
    content.trim() !== "" &&
    (mainCategory === "기타" ||
      (Array.isArray(subCategories) && subCategories.length > 0));

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
    const formData = new FormData();
    formData.append("mainCategory", mainCategory);
    formData.append("subCategories", subCategories.join(","));
    formData.append("uid", uid);
    formData.append("category_id", categoryId);
    formData.append("title", title);
    formData.append("content", content);
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

          if (main === "기타") {
            setCategoryId(6);
          } else if (subs.length > 0) {
            setCategoryId(subs[0]);
          } else {
            setCategoryId(null);
          }
        }}
      />

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

export default QuestionForm;
