import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { formatDate } from '../../lib/post';
import { Post } from '../../domain/entity/post';
import postActions from './actions';

const init: Post[] = [];

const postReducer = reducerWithInitialState(init).case(postActions.addPost, (state, payload) => {
  return [...state, { id: state.length + 1, createdAt: formatDate(new Date()), ...payload }];
});

export default postReducer;
