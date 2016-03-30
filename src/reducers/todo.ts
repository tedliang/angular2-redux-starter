import {List} from 'immutable';
import {Todo} from '../domain/todo';
import {UiState, initialUiState} from '../domain/ui-state';
import {
  ADD_TODO, DELETE_TODO, LOAD_TODOS, TOGGLE_TODO, TOGGLE_ALL_TODO,
  BACKEND_ACTION_STARTED, BACKEND_ACTION_FINISHED,
  SET_CURRENT_FILTER
} from '../actions/todo';

const persistentReducer = require('redux-pouchdb-plus').persistentReducer;

function todosReducer(state: List<Todo> = List([]), action) {
  switch (action.type) {
    case LOAD_TODOS:
      return List(action.todos);
    case ADD_TODO:
      return state.push(action.newTodo);
    case TOGGLE_TODO:
      return toggleTodo(state, action);
    case TOGGLE_ALL_TODO:
      return toggleAllTodo(state, action.completed);
    case DELETE_TODO:
      let index = state.findIndex((todo) => todo.id === action.todo.id);
      return state.delete(index);
    case SET_CURRENT_FILTER:
      return state.map(todo => todo);
    case '@@redux-pouchdb-plus/SET_REDUCER':
      return state.map(todo => new Todo(todo.toJS()));
    default:
      return state;
  }
}

function toggleTodo(state, action) {
  let index = state.findIndex((todo: Todo) => todo.id === action.todo.id);
  return state.set(index, action.todo.set('completed', !action.todo.completed));
}

function toggleAllTodo(state, completed) {
  return state.map(todo => todo.set('completed', completed));
}

function uiStateReducer(state: UiState = initialUiState, action) {
  switch (action.type) {
    case BACKEND_ACTION_STARTED:
      return state.merge({
        actionOngoing: true,
        message: action.message
      });
    case SET_CURRENT_FILTER:
      return state.set('currentFilter', action.filter);
    case BACKEND_ACTION_FINISHED:
      return state.merge({
        actionOngoing: false,
        message: action.message || initialUiState.message
      });
    case '@@redux-pouchdb-plus/SET_REDUCER':
      return new UiState(state.toJS());
    default:
      return state;
  }
}

const uiState = persistentReducer(uiStateReducer);
const todos = persistentReducer(todosReducer);

export {uiState, todos};
