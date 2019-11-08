import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import logger from 'redux-logger'
import createRootReducer from './reducers'

export default function configureStore(history, preloadedState) {
  return createStore(
    createRootReducer(history),
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      // logger
    )
  )
}
