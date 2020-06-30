import actionCreatorFactory from 'typescript-fsa';
import { Post } from '../../domain/entity/post';

const actionCreator = actionCreatorFactory();

const postActions = {
  // Partial型でPostを全て省略可能にする
  setPost: actionCreator<Partial<Post>>('SET_POST'),
  setTags: actionCreator<string[]>('SET_TAGS'),
  resetPost: actionCreator('RESET_POST'),
};

export default postActions;
