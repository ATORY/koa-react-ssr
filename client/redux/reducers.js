import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { INCREMENT, DECREMENT } from './actions';

const count = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}

const AppName = (state = 'unkownServer') => state;
const AppVersion = (state = 'v0.0.0') => state;

const createRootReducer = (history) => combineReducers({
  AppName,
  AppVersion,
  router: connectRouter(history),
  // ... rest of your reducers
  count,
});
export default createRootReducer

