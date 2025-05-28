import React, { useState, useRef} from 'react'; 
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GetAllComment, CreateComment } from '../../../API/CommentApi';
import { useSelector } from 'react-redux';
import  useAutoScroll from '../../../Hooks/useAutoScroll'

const CommentPanel = styled.div`
  border: 1px solid #eee;
  border-radius: 0 0 8px 8px;
  background: #fafafa;
  max-height: 300px;
  padding-bottom: 60px;
  overflow: auto;
  padding: 16px;
  transition: all 0.25s ease;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.span`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
  color: #222;
`;

const Text = styled.span`
  font-size: 14px;
  color: #333;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-top: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
`;

function CommentList({ postId, category_id }) {
  const [commentText, setCommentText] = useState('');
  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.user.userInfo);
  const uid = userInfo?.uid;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => GetAllComment(postId),
    enabled: !!postId,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: CreateComment,
    onSuccess: (data) => {
      console.log(data)
      setCommentText('');
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: (err) => {
      console.error('댓글 등록 실패:', err);
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmed = commentText.trim();
      if (!trimmed) return;

      mutation.mutate({
        uid,
        post_id: postId,
        category_id,
        content: trimmed,
      });
    }
  };

  const comments = data?.data || [];

  const commentPanelRef = useRef(null);
  // console.log(commentPanelRef)
  useAutoScroll(commentPanelRef, [comments]);

  return (
    <CommentPanel ref={commentPanelRef}>
      {comments.map((c) => (
        <CommentItem key={c.id}>
          <ProfileImage
            src={c.User?.profImg || '/images/default_profile.png'}
            alt={`${c.User?.nick || '익명'} 프로필`}
          />
          <CommentContent>
            <Nickname>{c.User?.nick || '익명'}</Nickname>
            <Text>{c.content}</Text>
          </CommentContent>
        </CommentItem>
      ))}

      <InputWrapper>
        <Input
          placeholder="댓글을 입력해주세요..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </InputWrapper>
    </CommentPanel>
  );
}

export default CommentList;
