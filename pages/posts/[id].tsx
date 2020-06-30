import Head from 'next/head';
import { useRouter } from 'next/router';

import PostDetail from '../../components/PostDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/entity/rootState';

const Post = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const router = useRouter();
  const data = posts.find((post) => post.id === Number(router.query.id));

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <PostDetail data={data} />
    </>
  );
};

export default Post;
