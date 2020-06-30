import Router from 'next/router';
import { Form, Input, TextArea, Button, Checkbox, CheckboxProps } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import TagsInput from 'react-tagsinput';

import { RootState } from '../domain/entity/rootState';
import { Post } from '../domain/entity/post';
import postActions from '../store/post/actions';
import postsActions from '../store/posts/actions';

const PostForm = () => {
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.post);
  const handleChange = (post: Partial<Post>) => {
    dispatch(postActions.setPost(post));
  };
  const handleTagsChange = (tags: string[]) => {
    dispatch(postActions.setTags(tags));
  };
  const handleSubmit = () => {
    dispatch(postsActions.addPost(post));
    dispatch(postActions.resetPost());
    Router.push('/');
  };

  return (
    <Form>
      <Form.Field
        value={post.title}
        control={Input}
        label="タイトル"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange({ title: e.target.value })}
      />
      <Form.Field>
        <label>タグ</label>
        <TagsInput value={post.tags} onChange={(data) => handleTagsChange(data)} />
      </Form.Field>
      <Form.Field
        value={post.content}
        size="massive"
        control={TextArea}
        label="内容"
        style={{ height: '37vw' }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange({ content: e.target.value })}
      />
      <div style={{ textAlign: 'right' }}>
        <Checkbox
          checked={post.private}
          style={{ marginRight: '8px' }}
          label="非公開にする"
          onChange={(_e, data: CheckboxProps) => handleChange({ private: data.checked })}
        />
        <Button onClick={() => handleSubmit()} inverted color="blue">
          保存
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
