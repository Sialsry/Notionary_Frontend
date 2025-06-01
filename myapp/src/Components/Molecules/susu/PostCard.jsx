import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateHeart, DeleteHeart } from "../../../API/HeartAPI";
import { useSelector } from "react-redux";
import Title from "../../Molecules/susu/Title";
import MediaSlider from "../../Atoms/susu/MediaSlider";
import hearticon from "../../../images/icons/hearticon.png";
import fullheart from "../../../images/icons/fullheart.png";

const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#f093fb",
  success: "#4ecdc4",
  danger: "#fd79a8",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const CardBlock = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto 16px;
  box-sizing: border-box;
`;

const Card = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #fff;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const TitleWrapper = styled.div`
  padding: 20px 24px 16px;
`;

const ContentWrap = styled.div`
  padding: 0 24px 24px;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 2px solid #f1f3f4;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  gap: 12px;
  border-bottom: 1px solid #f1f3f4;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  display: block;
  margin-bottom: 4px;
`;

const PostTime = styled.span`
  font-size: 12px;
  color: #6c757d;
`;

const CategoryWrapper = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: ${colors.gradient};
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
`;

const SubCategoryBadge = styled(CategoryBadge)`
  background: #f8f9fa;
  color: #495057;
  box-shadow: none;
  border: 1px solid #e9ecef;
`;

const WorkspaceWrap = styled.div`
  padding: 16px 20px;
  margin: 0 24px 20px;
  background: linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%);
  border-left: 4px solid ${colors.primary};
  border-radius: 8px;
`;

const WorkspaceTitle = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
  color: ${colors.primary};
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "📁";
  }
`;

const WorkspaceText = styled.div`
  font-size: 13px;
  color: #495057;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "none" : "2")};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WorkspaceToggle = styled.button`
  font-size: 12px;
  color: ${colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 6px;
  padding: 0;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const heartBeat = keyframes`
  0%, 100% { transform: scale(1); }
  10%, 30% { transform: scale(1.2); }
  20% { transform: scale(1.1); }
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ liked }) => (liked ? colors.gradient : "#f8f9fa")};
  color: ${({ liked }) => (liked ? "white" : "#495057")};
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    background: ${({ liked }) => (liked ? colors.secondary : colors.gradient)};
    color: white;
  }

  img {
    width: 18px;
    height: 18px;
    animation: ${({ liked }) => (liked ? heartBeat : "none")} 0.5s ease;
  }
`;

const InteractionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f1f3f4;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: #6c757d;
`;

const PostText = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: #212529;
  margin-top: 20px;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "none" : "3")};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MoreButton = styled.button`
  font-size: 14px;
  color: ${colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 8px;
  padding: 0;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const TitleText = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #212529;
  margin: 0;
  line-height: 1.4;
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
  parent_id,
  workspaceCtgrName,
  workspaceSubCtgrName,
}) {
  const [expanded, setExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const contentRef = useRef(null);
  const [showFullWorkspace, setShowFullWorkspace] = useState(false);
  const [showWorkspaceToggle, setShowWorkspaceToggle] = useState(false);
  const workspaceRef = useRef(null);

  useEffect(() => {
    const el = workspaceRef.current;
    if (!el) return;

    const frame = requestAnimationFrame(() => {
      const isOverflowing = el.scrollHeight > el.offsetHeight;
      setShowWorkspaceToggle(isOverflowing);
    });

    return () => cancelAnimationFrame(frame);
  }, [parent_id, workspaceCtgrName, workspaceSubCtgrName]);

  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.reducer.user.userInfo);
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
      queryClient.invalidateQueries(["hearts", post_id]);
    },
  });

  const CancelHeart = useMutation({
    mutationFn: DeleteHeart,
    onSuccess: () => {
      queryClient.invalidateQueries(["hearts", post_id]);
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
            const heartsWithDefaults = res.data.map((h) => ({
              uid: h.uid,
              nick: h.nick || "알 수 없음",
              profImg: h.profImg || "/images/default_profile.png",
            }));
            setLocalHearts(heartsWithDefaults);
          },
          onError: () => {
            setLiked(prevLiked);
            setLikeCount((count) => count + 1);
            setLocalHearts((prev) => [
              ...prev,
              { uid, nick, profImg: "/images/default_profile.png" },
            ]);
          },
        }
      );
    } else {
      CancelHeart.mutate(
        { post_id, uid },
        {
          onSuccess: () => {
            setLocalHearts((prev) => prev.filter((h) => h.uid !== uid));
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
          <AuthorInfo>
            <AuthorName>{authNick}</AuthorName>
            <PostTime>방금 전</PostTime>
          </AuthorInfo>
        </AuthorRow>

        <TitleWrapper>
          <TitleText>{title}</TitleText>
        </TitleWrapper>

        <CategoryWrapper>
          <CategoryBadge>{categoryName}</CategoryBadge>
          {subCategoryName && (
            <SubCategoryBadge>{subCategoryName}</SubCategoryBadge>
          )}
        </CategoryWrapper>

        {parent_id && (
          <WorkspaceWrap>
            <WorkspaceTitle>공유된 워크스페이스</WorkspaceTitle>
            <WorkspaceText ref={workspaceRef} expanded={showFullWorkspace}>
              {parent_id}
              {workspaceCtgrName && ` > ${workspaceCtgrName}`}
              {workspaceSubCtgrName && ` > ${workspaceSubCtgrName}`}
            </WorkspaceText>
            {showWorkspaceToggle && (
              <WorkspaceToggle
                onClick={() => setShowFullWorkspace(!showFullWorkspace)}
              >
                {showFullWorkspace ? "접기" : "더보기"}
              </WorkspaceToggle>
            )}
          </WorkspaceWrap>
        )}

        <MediaSlider images={images} videos={videos} />

        <ContentWrap>
          <PostText ref={contentRef} expanded={expanded}>
            {content}
          </PostText>
          {showMoreButton && (
            <MoreButton onClick={() => setExpanded(!expanded)}>
              {expanded ? "접기" : "더보기"}
            </MoreButton>
          )}

          <InteractionBar>
            <LikeButton liked={liked} onClick={handleLike}>
              <img src={liked ? fullheart : hearticon} alt="좋아요" />
              <span>{likeCount}</span>
            </LikeButton>

            <Stats>
              <span>댓글 {hearts.length}</span>
              <span>조회 128</span>
            </Stats>
          </InteractionBar>
        </ContentWrap>
      </Card>
    </CardBlock>
  );
}

export default PostCard;
