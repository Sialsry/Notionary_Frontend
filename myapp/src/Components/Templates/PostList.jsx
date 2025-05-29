import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { AllCategoryPost } from "../../API/PostApi";
import PostCard from "../Molecules/susu/PostCard";
import CommentList from "../Molecules/susu/CommentList";


const fadeUp = keyframes`
  from {opacity:0; transform: translateY(20px);} 
  to {opacity:1; transform: translateY(0);} 
`;

const FeedWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const AnimatedCardWrapper = styled.div`
  animation: ${fadeUp} 0.4s ease forwards;
`;

const LoadingText = styled.h2`
  text-align: center;
  color: #666;
  margin-top: 20px;
`;

const PAGE_SIZE = 5;

const PostList = ({ posts: externalPosts }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const {
    data: allPostsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['allPosts'],
    queryFn: async () => {
      const res = await AllCategoryPost({ offset: 0, limit: 1000 });
      return res.data;
    },
  });

  const postsToRender = externalPosts || allPostsData;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [postsToRender]);

  useEffect(() => {
    const onScroll = () => {
      if (!postsToRender || visibleCount >= postsToRender.length) return;

      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollHeight - (scrollY + innerHeight) < 300) {
        setTimeout(() => {
          setVisibleCount((prev) =>
            Math.min(prev + PAGE_SIZE, postsToRender.length)
          );
        }, 500);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [visibleCount, postsToRender]);

  if (!externalPosts && isLoading)
    return <LoadingText>로딩중...</LoadingText>;

  if (!externalPosts && isError)
    return <LoadingText>데이터를 불러오는 중 오류가 발생했어요.</LoadingText>;

  const parseImgPaths = (str) => {
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const parseVideoPaths = (str) => {
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return str ? [str] : [];
    }
  };

  const flatPosts = postsToRender.flatMap((category) => category.Posts || []);
  if (flatPosts.length === 0) {
    return <LoadingText>게시글이 없습니다.</LoadingText>;
  }

  return (
    <FeedWrapper>
      {postsToRender.slice(0, visibleCount).map((category) =>
        category.Posts?.map((post, index) => {
          const isTopEtc =
            category.depth === 1 && category.category_name === "기타";
          const categoryName = isTopEtc
            ? "기타"
            : category.ParentCategory?.category_name || "알 수 없는 카테고리";
          const subCategoryName = isTopEtc
            ? ""
            : category.category_name;

          return (
            <AnimatedCardWrapper
              key={post.post_id}
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <PostCard
                authorUid={post.uid || "사용자 정보 없음"}
                title={post.title || "제목없음"}
                images={parseImgPaths(post.imgPaths)}
                videos={parseVideoPaths(post.videoPaths)}
                imageAlt={post.title || "제목없음"}
                content={post.content || "내용이 없습니다."}
                categoryName={categoryName}
                subCategoryName={subCategoryName}
                post_id={post.post_id}
                category_id={category.category_id}
                hearts={post.Hearts || []}
              />
              <CommentList
                postId={post.post_id}
                category_id={category.category_id}
                comments={(post.Comments || []).map((comment) => ({
                  profileImageUrl: "/images/default_profile.png",
                  nickname: comment.nick,
                  content: comment.content,
                  createdAt: comment.createdAt,
                }))}
              />
            </AnimatedCardWrapper>
          );
        })
      )}

      {visibleCount >= postsToRender.length && (
        <p style={{ textAlign: "center" }}>마지막 게시물입니다.</p>
      )}
    </FeedWrapper>
  );
};

export default PostList;

