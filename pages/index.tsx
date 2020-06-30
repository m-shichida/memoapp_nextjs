import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from '../domain/entity/rootState';
import PostCard from '../components/PostCard';

const Home = () => {
  const posts = useSelector((state: RootState) => state.posts);

  return (
    <SCFlex>
      {posts.map((post, i) => (
        <PostCard key={i} data={post} />
      ))}
    </SCFlex>
  );
};

const SCFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export default Home;
