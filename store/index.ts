import { createStore, combineReducers } from 'redux';
import postReducer from './post/reducer';
import postsReducer from './posts/reducer';
import { RootState } from '../domain/entity/rootState';

const store = createStore(
  combineReducers<RootState>({
    post: postReducer,
    posts: postsReducer,
  }),
  (process.browser as any).__REDUX_DEVTOOLS_EXTENSION__ && (process.browser as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
