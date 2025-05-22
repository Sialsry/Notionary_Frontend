import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../../Molecules/susu/Title';
import Image from '../../Atoms/susu/Image';
import Input from '../../Atoms/susu/Input';


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
`;

const PostText = styled.p`
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
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 16px;
`;


const CommentPanel = styled.div`
  border: 1px solid #eee;
  border-top: none;
  border-radius: 0 0 8px 8px;
  background: #fafafa;
  max-height: 300px;
  overflow: auto;
  opacity: 1;
  padding: 16px;
  transition: all 0.25s ease;
`;
const CommentItem = styled.div`
  font-size: 14px;
  padding: 4px 0;
  color: #333;
`;

function PostCard({ title, imageSrc,imageAlt = title, content, categoryName ,subCategoryName}) {
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    '첫 댓글 예시 🙌',
    '두 번째 댓글 🎉',
  ]);

  const addComment = e => {
    if (e.key === 'Enter' && commentText.trim()) {
      setComments(prev => [...prev, commentText.trim()]);
      setCommentText('');
    }
  };

  return (
    <CardBlock>
      <Card>
        <Title fontSize="20px" style={{ padding: '16px' }}>{title}</Title>
        <p style={{ padding: '0 16px', color: '#666', fontSize: '14px', marginTop: '-12px', marginBottom: '12px' }}>
          카테고리: {categoryName}
          {subCategoryName && ` > ${subCategoryName}`}
        </p>
        <Image src={imageSrc} alt={imageAlt} width="100%" height="180px" />

        <ContentWrap>
          <PostText expanded={expanded}>{content}</PostText>
          {content.length > 120 && (
            <MoreButton onClick={() => setExpanded(!expanded)}>
              {expanded ? '접기' : '더보기'}
            </MoreButton>
          )}
        </ContentWrap>
      </Card>


      <CommentPanel className="comment-panel">
        {comments.map((c, idx) => (
          <CommentItem key={idx}>{c}</CommentItem>
        ))}

        <Input
          width="100%"
          height="40px"
          placeholder="댓글을 입력하세요… (Enter 제출)"
        >
        </Input>

        <input
          style={{ display: 'none' }}
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          onKeyDown={addComment}
        />
      </CommentPanel>
    </CardBlock>
  );
}

export default PostCard;
