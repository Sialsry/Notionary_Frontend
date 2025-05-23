import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { AllCategoryPost } from "../../API/PostApi";
import PostCard from "../Molecules/susu/PostCard";

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

// 게시글 개수 기본 개수 5
const PAGE_SIZE = 5;

const PostList = ({ posts }) => {
  // 전체 게시글 저장 상태
  const [allPosts, setAllPosts] = useState([]);
  // 화면에 보여지는 게시글 갯수 상태 
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // 로딩 상태관리
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    setVisibleCount(PAGE_SIZE); // 카테고리 변경 시 초기화
  }, [posts]);

  
useEffect(() => {
  if (posts && posts.length > 0) {
    setAllPosts(posts);
  } else {
    async function dataAll() {
      setLoading(true);
      try {
        const res = await AllCategoryPost({ offset: 0, limit: 800 });
        setAllPosts(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    dataAll();
  }
}, [posts]);

  useEffect(() => {
    // 스크롤 이벤트 핸들러 함수 
    const onScroll = () => {
      if (loading) return;
      // 화면에 보여지는 게시글 수가 전체 게시글 수보다 크거나 같으면 반환
      if (visibleCount >= allPosts.length) return;

      // 스크롤 위치 값 윈도우 기준
      const scrollY = window.scrollY;
      // 윈도우 창 높이 
      const innerHeight = window.innerHeight;
      // 문서 전체 높이
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollHeight - (scrollY + innerHeight) < 300) {
        setLoading(true);
        setTimeout(() => {
          let newCount = visibleCount + PAGE_SIZE;
          if (newCount > allPosts.length) {
            newCount = allPosts.length;
          }
          setVisibleCount(newCount);
          setLoading(false);
        }, 500);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [visibleCount, allPosts.length, loading]);

  return (
    <FeedWrapper>


  {!loading && allPosts.length === 0 && (
  <LoadingText>게시글이 없습니다.</LoadingText>
)}

  {Array.isArray(allPosts) &&
      allPosts.slice(0, visibleCount).map((post, index) => (
    <AnimatedCardWrapper
      key={post.post_id}
      style={{ animationDelay: `${index * 300}ms` }}
    >
      <PostCard
        title={post.title || "제목없음"}
        imageSrc={post.imgPaths || ""}
        imageAlt={post.title || "제목없음"}
        content={post.content || "내용이 없습니다."}
        categoryName={post.mainCategory || post.category_name}
        subCategoryName={
          post.subCategory || post.SubCategory?.category_name
        }
      />
    </AnimatedCardWrapper>
))}

      {loading && <LoadingText>로딩중...</LoadingText>}
      {!loading && visibleCount >= allPosts.length && (
        <p style={{ textAlign: "center" }}>마지막 게시물입니다.</p>
      )}
    </FeedWrapper>
  );
};

export default PostList;
