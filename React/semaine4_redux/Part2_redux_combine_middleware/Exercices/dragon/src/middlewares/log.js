import { ADD_DRAGON, DELETE_DRAGON, ADD_KNIGHT, DELETE_KNIGHT } from '../constants/actions';
import { set_log, getDateNow } from '../actions/actions-types';

const middlewareLog = store => next => action => {

  const returnAction = next(action);

  if (action.type === ADD_DRAGON || action.type === DELETE_DRAGON) {
    const { count } = store.getState().dragonReducer;

    store.dispatch(set_log({ count : count , date : getDateNow(), name : 'dragon' }));
  }

  if (action.type === ADD_KNIGHT || action.type === DELETE_KNIGHT) {
    const { count } = store.getState().knightReducer;

    store.dispatch(set_log({ count : count , date : getDateNow(), name : 'knight'}));
  }

  return returnAction; // les autres middlewares ...
}

export default middlewareLog;