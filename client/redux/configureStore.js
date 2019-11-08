import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';

export default function configureStore(history, preloadedState, client = false) {
  if (client) {
    const composeEnhancers = process.env.NODE_ENV === 'development' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
    return createStore(
      createRootReducer(history),
      preloadedState,
      composeEnhancers(applyMiddleware(
        thunkMiddleware,
      )),
    );
  }
  return createStore(
    createRootReducer(history),
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
    ),
  );
}
