import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import { Header, Label, Message } from 'semantic-ui-react';

import { Post } from '../domain/entity/post';

const PostDetail = ({ data }: { data: Post }) => {
  return (
    <>
      <Header as="h1">{data.title}</Header>
      {data.tags.map((tag, i) => (
        <Label as="a" color="green" key={i} tag>
          {tag}
        </Label>
      ))}
      <div style={{ marginTop: '16px' }}>
        <Label>{data.createdAt}</Label>
      </div>
      <Message style={{ marginTop: '16px', width: '88vw' }}>
        {unified().use(parse).use(remark2react).processSync(data.content).result}
      </Message>
    </>
  );
};

export default PostDetail;
