import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateHeart, DeleteHeart } from '../../../API/HeartAPI';
import { useSelector } from 'react-redux';
import Title from '../../Molecules/susu/Title';
import MediaSlider from '../../Atoms/susu/MediaSlider';
import hearticon from '../../../images/icons/hearticon.png';
import fullheart from '../../../images/icons/fullheart.png';

const CardBlock = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 12px;
  box-sizing: border-box;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: #fff;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  padding: 16px;
`;

const ContentWrap = styled.div`
  padding: 0 16px 16px;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
`;

const AuthorName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const CategoryText = styled.p`
  padding: 0 16px;
  color: #666;
  font-size: 14px;
  margin-top: -12px;
  margin-bottom: 12px;
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
  margin-right: 8px;
  transition: transform 0.15s ease-in-out;

  &:active {
    transform: scale(1.1);
  }

  animation: ${({ liked }) => (liked ? heartBeat : 'none')} 0.6s ease-in-out;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

const LikeCountText = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #555;
`;

const PostText = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'expanded',
})`
  font-size: 15px;
  line-height: 1.4;
  margin: 0;
  white-space: pre-line;

  ${({ expanded }) =>
    expanded
      ? `
        display: block;
        overflow: visible;
        max-height: none;
      `
      : `
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      `}
`;
const MoreButton = styled.button`
  font-size: 14px;
  color: #7e57c2;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 4px;
  margin-left: 16px;
`;

function PostCard({
  title,
  authProImg,
  images,
  videos,
  content,
  categoryName,
  subCategoryName,
  category_id,
  post_id,
  authNick,
  hearts = [],
}) {
  const [expanded, setExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const contentRef = useRef(null);

  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.user.userInfo);
  const uid = userInfo?.uid;
  const nick = userInfo?.nick;

  const [localHearts, setLocalHearts] = useState(hearts);

  const [liked, setLiked] = useState(() =>
    hearts.some((heart) => heart.uid === uid)
  );

  const [likeCount, setLikeCount] = useState(hearts.length);

  useEffect(() => {
    setLocalHearts(hearts);
    setLiked(hearts.some((heart) => heart.uid === uid));
    setLikeCount(hearts.length);
  }, [hearts, uid]);

  const HeartMutation = useMutation({
    mutationFn: CreateHeart,
    onSuccess: () => {
      queryClient.invalidateQueries(['hearts', post_id]);
    },
  });

  const CancelHeart = useMutation({
    mutationFn: DeleteHeart,
    onSuccess: () => {
      queryClient.invalidateQueries(['hearts', post_id]);
    },
  });

  const handleLike = () => {
    const prevLiked = liked;
    const newLiked = !liked;

    setLiked(newLiked);
    setLikeCount((count) => count + (newLiked ? 1 : -1));

    if (newLiked) {
      HeartMutation.mutate(
        { post_id, uid },
        {
          onSuccess: (res) => {
            console.log('좋아요 성공, 받은 데이터:', res.data);
            const heartsWithDefaults = res.data.map(h => ({
              uid: h.uid,
              nick: h.nick || '알 수 없음',
              profImg: h.profImg || '/images/default_profile.png',
            }));
            setLocalHearts(heartsWithDefaults);
          },
          onError: () => {
            setLiked(prevLiked);
            setLikeCount((count) => count + 1);
            setLocalHearts((prev) => [...prev, { uid, nick, profImg: '/images/default_profile.png' }]);
          },
        }
      );
    } else {
      CancelHeart.mutate(
        { post_id, uid },
        {
          onSuccess: () => {
            setLocalHearts((prev) => prev.filter(h => h.uid !== uid));
          },
          onError: () => {
            setLiked(prevLiked);
            setLikeCount((count) => count + 1);
            setLocalHearts((prev) => [...prev, { uid, nick }]);
          },
        }
      );
    }
  };

useEffect(() => {
  const el = contentRef.current;
  if (!el) return;

  const frame = requestAnimationFrame(() => {
    const isOverflowing = el.scrollHeight > el.offsetHeight;
    setShowMoreButton(isOverflowing);
  });

  return () => cancelAnimationFrame(frame);
}, [content]);


  return (
    <CardBlock>
      <Card>
        <AuthorRow>
          <ProfileImage src={authProImg} alt="작성자 프로필 사진" />
          <AuthorName>{authNick}</AuthorName>
        </AuthorRow>

        <TitleWrapper>
          <Title fontSize="20px">{title}</Title>
        </TitleWrapper>

        <CategoryText>
          카테고리: {categoryName} {subCategoryName && ` > ${subCategoryName}`}
        </CategoryText>

        <MediaSlider images={images} videos={videos} />

        <ContentWrap>
          <PostText ref={contentRef} expanded={expanded}>
            {content}
          </PostText>
          {showMoreButton && (
            <MoreButton onClick={() => setExpanded((prev) => !prev)}>
              {expanded ? '접기' : '더보기'}
            </MoreButton>
          )}

          <LikeWrapper>
            <LikeIcon
              src={liked ? fullheart : hearticon}
              alt="좋아요"
              liked={liked}
              onClick={handleLike}
            />
            <LikeCountText>{likeCount}명 좋아함</LikeCountText>
          </LikeWrapper>
        </ContentWrap>
      </Card>
    </CardBlock>
  );
}

export default PostCard;
