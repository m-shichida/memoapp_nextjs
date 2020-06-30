import actionCreatorFactory from 'typescript-fsa';
import { Post } from '../../domain/entity/post';

const actionCreator = actionCreatorFactory();

const postsActions = {
  addPost: actionCreator<Post>('ADD_POST'),
};

export default postsActions;
