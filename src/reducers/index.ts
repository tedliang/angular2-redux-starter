import { combineReducers } from 'redux';
import {todos, uiState} from './todo';
import counter from './counter';
import session from './session';

export default combineReducers({
  todos,
  uiState,
  counter,
  session
});
