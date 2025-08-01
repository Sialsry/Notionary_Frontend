import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { AllCategoryPost, GetWorkSpace } from "../../API/PostApi";
import PostCard from "../Molecules/susu/PostCard";
import CommentList from "../Molecules/susu/CommentList";

const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const fadeUp = keyframes`
  from {
    opacity: 0; 
    transform: translateY(20px);
  } 
  to {
    opacity: 1; 
    transform: translateY(0);
  } 
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
  animation: ${fadeUp} 0.5s ease forwards;
  opacity: 0;
  width: 680px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const LoadingText = styled.h2`
  color: #6c757d;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;

  .emoji {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .message {
    font-size: 18px;
    color: #495057;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .sub-message {
    font-size: 14px;
    color: #6c757d;
  }
`;

const LoadMoreIndicator = styled.div`
  text-align: center;
  padding: 32px 20px;
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
`;

const EndMessage = styled.p`
  text-align: center;
  padding: 32px 20px;
  font-size: 14px;
  color: #6c757d;
  border-top: 1px solid #f1f3f4;
  margin-top: 24px;
`;

const PAGE_SIZE = 5;

const PostList = ({ posts: externalPosts }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.reducer.user.userInfo);
  const uid = userInfo?.uid;

  const {
    data: allPostsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const res = await AllCategoryPost({ offset: 0, limit: 1000 });
      return res.data;
    },
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const {
    data: workspacedata,
    isLoading: isWorkspacesLoading,
    isError: isWorkspacesError,
  } = useQuery({
    queryKey: ["workspaces", uid],
    queryFn: () => GetWorkSpace(uid),
    enabled: !!uid, // ✅ uid가 있을 때만 실행
  });

  useEffect(() => {
    console.log("uid:", uid); // undefined인지 확인
  }, [uid]);

  const workspaceDatas = workspacedata?.data || [];

  useEffect(() => {
    console.log(workspaceDatas, "workspaceDatas");
  }, [workspaceDatas]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
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
    if (isLoading)
      return (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>게시물을 불러오는 중...</LoadingText>
        </LoadingContainer>
      );

    if (isError)
      return (
        <EmptyState>
          <div className="emoji">😢</div>
          <div className="message">
            데이터를 불러오는 중 오류가 발생했습니다
          </div>
          <div className="sub-message">잠시 후 다시 시도해 주세요</div>
        </EmptyState>
      );
  }

  if (!isLoading && flatPosts.length === 0) {
    return (
      <EmptyState>
        <div className="emoji">📝</div>
        <div className="message">아직 게시물이 없습니다</div>
        <div className="sub-message">첫 번째 게시물을 작성해보세요!</div>
      </EmptyState>
    );
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
          const isTopEtc =
            category.depth === 1 && category.category_name === "기타";
          const categoryName = isTopEtc
            ? "기타"
            : category.ParentCategory?.category_name || "알 수 없는 카테고리";
          const subCategoryName = isTopEtc ? "" : category.category_name;
          const workspacePages = (() => {
            try {
              return post.workspace_pages
                ? JSON.parse(post.workspace_pages)
                : [];
            } catch {
              return [];
            }
          })();
          const result = workspaceDatas
            .filter((item) => workspacePages.includes(item.workspace_id))
            .map((item) => item.workspacesubctgrs_name);
          console.log("type11", result, "sdfd", workspacePages);
          return (
            <AnimatedCardWrapper
              key={post.post_id}
              style={{ animationDelay: `${index * 100}ms` }}
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
                parent_id={post.Workspacectgr?.parent_id || ""}
                workspaceCtgrName={
                  post.Workspacectgr?.workspacectgrs_name ||
                  "워크 스페이스 없음"
                }
                // workspaceSubCtgrName={post.Workspacectgr?.workspacesubctgrs_name || "페이지 없음"}
                workspaceSubCtgrName={result || "페이지 없음"}
                result_id={workspacePages}
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
        <LoadMoreIndicator>
          <LoadingSpinner />
          <p style={{ marginTop: "12px" }}>더 많은 게시물을 불러오는 중...</p>
        </LoadMoreIndicator>
      ) : (
        flatPosts.length > 0 && (
          <EndMessage>모든 게시물을 확인했습니다 ✨</EndMessage>
        )
      )}
    </FeedWrapper>
  );
};

export default PostList;
