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

const PostList = () => {
  // 전체 게시글 저장 상태
  const [allPosts, setAllPosts] = useState([]);
  // 화면에 보여지는 게시글 갯수 상태 
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // 로딩 상태관리
  const [loading, setLoading] = useState(false);

  // useEffect로  서버측 API 호출
  useEffect(() => {
    // dataAll() 비동기 함수로 서버에서 요청을 받아온다다
    async function dataAll() {
      // setLoading을 true로 설정정
      setLoading(true);
      try {
        // AllCategoryPost() 함수를 호출하여 매개변수로 offset, limit 설정 
        // offset은 
        const res = await AllCategoryPost({ offset: 0, limit: 800 });
        setAllPosts(res.data); // 받아온 데이터 저장
      } catch (error) {
        console.log(error);
      }
      setLoading(false); // 로딩 상태를 False
    }
    dataAll();
  }, []); // 최초에 한번만

  useEffect(() => {
    // 스크롤 이벤트 핸들러 함수 부분분
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
      {allPosts.slice(0, visibleCount).map((post, index) => (
        <AnimatedCardWrapper
          key={post["Posts.post_id"]}
          style={{ animationDelay: `${index * 300}ms` }}
        >
          <PostCard
            title={post["Posts.title"]}
            imageSrc={post["Posts.imgPaths"]}
            imageAlt={post["Posts.title"]}
            content={post["Posts.content"]}
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
