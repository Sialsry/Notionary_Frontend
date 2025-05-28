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

const PostList = () => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
 const {
  data: allPosts = [],
  isLoading,
  isError,
} = useQuery({
  queryKey: ['allPosts'],
  queryFn: async () => {
    const res = await AllCategoryPost({ offset: 0, limit: 800 });
    return res.data;
  },
});
  useEffect(() => {
    setVisibleCount(PAGE_SIZE); 
  }, []);


  useEffect(() => {
    const onScroll = () => {
      if (isLoading) return;
      if (visibleCount >= allPosts.length) return;

      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollHeight - (scrollY + innerHeight) < 300) {
        setTimeout(() => {
          let newCount = visibleCount + PAGE_SIZE;
          if (newCount > allPosts.length) {
            newCount = allPosts.length;
          }
          setVisibleCount(newCount);
        }, 500);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [visibleCount, allPosts.length, isLoading]);

  if (isLoading) return <LoadingText>로딩중...</LoadingText>;
  if (isError) return <LoadingText>데이터를 불러오는 중 오류가 발생했어요.</LoadingText>;

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



  return (
    <FeedWrapper>
      {allPosts.length === 0 && (
        <LoadingText>게시글이 없습니다.</LoadingText>
      )}

      {allPosts.slice(0, visibleCount).map((category) =>
        category.Posts?.map((post, index) => (
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
              categoryName={
              category.ParentCategory?.category_name || "대표 카테고리"
              }
              subCategoryName={category.category_name || "세부 카테고리"}
              post_id={post.post_id}
              category_id={category.category_id}
              hearts={post.Hearts || []} 
            />
            <CommentList
            postId={post.post_id}
            category_id={category.category_id}
            comments={(post.Comments || []).map((comment) => ({
            profileImageUrl: '/images/default_profile.png',
            nickname: comment.nick,
            content: comment.content,
            createdAt: comment.createdAt,
      }))}
      />
          </AnimatedCardWrapper>
        ))
      )}

      {visibleCount >= allPosts.length && (
        <p style={{ textAlign: "center" }}>마지막 게시물입니다.</p>
      )}
    </FeedWrapper>
  );
};

export default PostList;
