// configureStore.js

import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  return createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))))
  );
}
