import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useQuery , useQueryClient} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { AllCategoryPost } from "../../API/PostApi";
import PostCard from "../Molecules/susu/PostCard";
import CommentList from "../Molecules/susu/CommentList";


const fadeUp = keyframes`
  from {opacity:0; transform: translateY(20px);} 
  to {opacity:1; transform: translateY(0);} 
`;

const FeedWrapper = styled.div`
  max-width: 1050px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 32px;
  min-height: 400px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 24px 12px;
    gap: 24px;
  }
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
  const queryClient = useQueryClient();

  const { data: allPostsData = [], isLoading, isError,} = useQuery({
    queryKey: ['allPosts'],
    queryFn: async () => {
      const res = await AllCategoryPost({ offset: 0, limit: 1000 });
      return res.data;
    },
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
    }, 30000);

    return () => clearInterval(intervalId);
  }, [queryClient]);

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
  
  const flatPosts = postsToRender.flatMap((category) => category.Posts || []);
  
  if (!externalPosts) {
    if (isLoading) return <LoadingText>로딩중...</LoadingText>;
    if (isError) return <LoadingText>데이터를 불러오는 중 오류가 발생했어요.</LoadingText>;
  }

if (!isLoading && flatPosts.length === 0) {
  return <LoadingText>게시물이 없습니다.</LoadingText>;
}

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
      {postsToRender.slice(0, visibleCount).map((category) =>
        category.Posts?.map((post, index) => {
          const isTopEtc = category.depth === 1 && category.category_name === "기타";
          const categoryName = isTopEtc? "기타" : category.ParentCategory?.category_name || "알 수 없는 카테고리";
          const subCategoryName = isTopEtc ? "" : category.category_name;

          return (
            <AnimatedCardWrapper
              key={post.post_id}
              style={{ animationDelay: `${index * 300}ms` }}
            >
          <PostCard
            authNick={post.User?.nick || "사용자 닉네임 없음"}
            authProImg={post.User?.profImg || "/images/default_profile.png"}
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
            parent_id={post.Workspacectgr?.parent_id || "보이니?"}
            workspaceCtgrName={post.Workspacectgr?.workspacectgrs_name || "워크 스페이스 없음"}
            workspaceSubCtgrName={post.Workspacectgr?.workspacesubctgrs_name || "페이지 없음"}
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

      {visibleCount < flatPosts.length ? (
    <LoadingText>불러오는 중...</LoadingText>) : (
        <p style={{ textAlign: "center" }}>마지막 게시물입니다.</p>
      )}
    </FeedWrapper>
  );
};

export default PostList;