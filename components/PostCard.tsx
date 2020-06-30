import styled from 'styled-components';
import Link from 'next/link';
import { Card } from 'semantic-ui-react';

import { Post } from '../domain/entity/post';

const PostCard = ({ data }: { data: Post }) => {
  return (
    <SCCardContainer>
      <Card style={{ width: '305px' }}>
        <Card.Content>
          <Card.Header>
            <Link href="/posts/[id]" as={`/posts/${data.id}`}>
              <a>{data.title}</a>
            </Link>
          </Card.Header>
          <SCCardDescription>{data.content}</SCCardDescription>
        </Card.Content>
        <Card.Content extra textAlign="right">
          <a>{data.createdAt}</a>
        </Card.Content>
      </Card>
    </SCCardContainer>
  );
};

const SCCardContainer = styled.div`
  margin-left: 8px;
  margin-top: 8px;
`;

const SCCardDescription = styled(Card.Description)`
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export default PostCard;
