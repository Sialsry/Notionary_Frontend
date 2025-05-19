import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AllCategoryPost } from '../../API/PostApi';
import styled from 'styled-components';
import PostCard from '../Molecules/PostCard';

const FeedWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const PostList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: AllCategoryPost,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });

  return (
    <FeedWrapper>
      {isLoading && <p>불러오는 중...</p>}
      {isError && <p>문제가 발생했습니다: {error.message}</p>}

      {data.map(post => (
        <PostCard
          key={post.id}
          title={post.title}
          imageSrc={post.imageSrc}
          imageAlt={post.imageAlt}
          content={post.content}
        />
      ))}
    </FeedWrapper>
  );
};

export default PostList;
