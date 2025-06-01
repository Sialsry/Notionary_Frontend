import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetAllComment, CreateComment } from "../../../API/CommentApi";
import { useSelector } from "react-redux";
import useAutoScroll from "../../../Hooks/useAutoScroll";

const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const CommentPanel = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 16px;
  background: #fafbfc;
  max-height: 320px;
  overflow: auto;
  transition: all 0.3s ease;
  margin-top: -16px;
  position: relative;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f3f4;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.primary};
    border-radius: 3px;

    &:hover {
      background: ${colors.secondary};
    }
  }
`;

const CommentSection = styled.div`
  padding: 20px 24px;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 2px solid #f1f3f4;
  flex-shrink: 0;
`;

const CommentContent = styled.div`
  flex: 1;
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -8px;
    top: 14px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 8px 6px 0;
    border-color: transparent white transparent transparent;
  }

  &::after {
    content: "";
    position: absolute;
    left: -9px;
    top: 14px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 8px 6px 0;
    border-color: transparent #e9ecef transparent transparent;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const Nickname = styled.span`
  font-weight: 600;
  font-size: 13px;
  color: #212529;
`;

const CommentTime = styled.span`
  font-size: 11px;
  color: #6c757d;
`;

const Text = styled.p`
  font-size: 14px;
  color: #495057;
  margin: 0;
  line-height: 1.5;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: white;
  border-top: 1px solid #e9ecef;
  position: sticky;
  bottom: 0;
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f1f3f4;
`;

const InputContainer = styled.div`
  flex: 1;
  position: relative;
`;

const Input = styled.input`
  width: 83%;
  padding: 10px 16px;
  padding-right: 80px;
  border: 2px solid #e9ecef;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const SendButton = styled.button`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px 16px;
  background: ${colors.gradient};
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;

  .emoji {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .text {
    font-size: 14px;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  font-size: 14px;
`;

function CommentList({ postId, category_id }) {
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.reducer.user.userInfo);
  const uid = userInfo?.uid;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => GetAllComment(postId),
    enabled: !!postId,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: CreateComment,
    onSuccess: (data) => {
      setCommentText("");
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (err) => {
      console.error("댓글 등록 실패:", err);
    },
  });

  const handleSubmit = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;

    mutation.mutate({
      uid,
      post_id: postId,
      category_id,
      content: trimmed,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const comments = data?.data || [];

  const commentPanelRef = useRef(null);
  useAutoScroll(commentPanelRef, [comments]);

  return (
    <CommentPanel ref={commentPanelRef}>
      <CommentSection>
        {isLoading ? (
          <LoadingState>댓글을 불러오는 중...</LoadingState>
        ) : comments.length === 0 ? (
          <EmptyState>
            <div className="emoji">💬</div>
            <div className="text">첫 댓글을 남겨보세요!</div>
          </EmptyState>
        ) : (
          comments.map((c) => (
            <CommentItem key={c.id}>
              <ProfileImage
                src={c.User?.profImg || "/images/default_profile.png"}
                alt={`${c.User?.nick || "익명"} 프로필`}
              />
              <CommentContent>
                <CommentHeader>
                  <Nickname>{c.User?.nick || "익명"}</Nickname>
                </CommentHeader>
                <Text>{c.content}</Text>
              </CommentContent>
            </CommentItem>
          ))
        )}
      </CommentSection>

      <InputWrapper>
        <UserAvatar
          src={userInfo?.profImg || "/images/default_profile.png"}
          alt="내 프로필"
        />
        <InputContainer>
          <Input
            placeholder="댓글을 입력하세요..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SendButton
            onClick={handleSubmit}
            disabled={!commentText.trim() || mutation.isLoading}
          >
            {mutation.isLoading ? "전송 중..." : "전송"}
          </SendButton>
        </InputContainer>
      </InputWrapper>
    </CommentPanel>
  );
}

export default CommentList;
