import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Post } from '../../domain/entity/post';
import postActions from './actions';

const init: Post = {
  title: '',
  tags: [],
  content: '',
  private: false,
};

const postReducer = reducerWithInitialState(init)
  .case(postActions.setPost, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(postActions.setTags, (state, payload) => ({
    ...state,
    tags: Array.from(new Set([...state.tags, ...payload])),
  }))
  .case(postActions.resetPost, () => init);

export default postReducer;
