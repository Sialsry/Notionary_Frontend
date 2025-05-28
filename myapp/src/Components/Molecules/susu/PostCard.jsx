import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateHeart } from '../../../API/HeartAPI';
import { useSelector } from 'react-redux';
import Title from '../../Molecules/susu/Title';
import MediaSlider from '../../Atoms/susu/MediaSlider';
import hearticon from '../../../images/icons/hearticon.png'
import fullheart from '../../../images/icons/fullheart.png'

const CardBlock = styled.div`
  width: 600px;
  margin-bottom: 12px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: #fff;
  overflow: hidden;
`;

const ContentWrap = styled.div`
  padding: 0 16px 16px;
  position: relative;
`;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(1); }
  75% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-top: 8px;
  margin-left: 16px;
  transition: transform 0.15s ease-in-out;

  &:active {
    transform: scale(1.1);
  }

  animation: ${({ liked }) => (liked ? heartBeat : 'none')} 0.6s ease-in-out;
`;

const PostText = styled.p.withConfig({
  shouldForwardProp: prop => prop !== 'expanded',
})`
  font-size: 15px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? 'unset' : 1)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MoreButton = styled.button`
  font-size: 14px;
  color:  #7e57c2;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 4px;
  margin-left: 16px;
`;

function PostCard({ title, images, videos, content,categoryName, subCategoryName, category_id, post_id, authorUid,hearts = [],}) {
  const [expanded, setExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [commentText, setCommentText] = useState('');
  const contentRef = useRef(null);

  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.user.userInfo);
  const uid = userInfo?.uid;

  const [liked, setLiked] = useState(() =>
    hearts.some((heart) => heart.uid === uid)
  );


  const [likeCount, setLikeCount] = useState(hearts.length);

  const HeartMutation = useMutation({
    mutationFn: CreateHeart,
    onSuccess: (data) => {
      console.log('하트 생성 성공:', data);
      queryClient.invalidateQueries(['hearts', post_id]);
    },
    onError: (error) => {
      console.error('하트 생성 실패:', error);
    },
  });

  const handleLike = () => {
    const prevLiked = liked;
    const newLiked = !liked;

    setLiked(newLiked);
    setLikeCount((count) => count + (newLiked ? 1 : -1));

    HeartMutation.mutate(
      { post_id, uid },
      {
        onError: () => {
          setLiked(prevLiked);
          setLikeCount((count) => count + (prevLiked ? 1 : -1));
        },
      }
    );
  };

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      const isOverflowing = el.scrollHeight > el.clientHeight + 1;
      setShowMoreButton(isOverflowing);
    }
  }, [content]);

  return (
    <CardBlock>
      <Card>
        <p>작성자 ID: {authorUid}</p>
        <Title fontSize="20px" style={{ padding: '16px' }}>{title}</Title>
        <p style={{ padding: '0 16px', color: '#666', fontSize: '14px', marginTop: '-12px', marginBottom: '12px' }}>
          카테고리: {categoryName}
          {subCategoryName && ` > ${subCategoryName}`}
        </p>
        <MediaSlider images={images} videos={videos} />
        <ContentWrap>
          <PostText ref={contentRef} expanded={expanded}>
            {content}
          </PostText>
          {showMoreButton && (
            <MoreButton onClick={() => setExpanded(prev => !prev)}>
              {expanded ? '접기' : '더보기'}
            </MoreButton>
          )}

          <p>좋아요 {hearts.length}개</p>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
            <LikeIcon
              src={liked ? fullheart : hearticon}
              alt="좋아요"
              liked={liked}
              onClick={handleLike}
            />
            <span style={{ marginLeft: 8, fontSize: '14px', color: '#555' }}>
              {likeCount}명 좋아함
            </span>
          </div>
          {likeCount > 0 && (
            <p style={{ fontSize: '12px', color: '#999', marginTop: 4 }}>
              좋아요한 사람: {hearts.slice(0, 3).map(h => h.uid).join(', ')}
              {likeCount > 3 && ` 외 ${likeCount - 3}명`}
            </p>
          )}
        </ContentWrap>
      </Card>
    </CardBlock>
  );
}

export default PostCard;
