// configureStore.js

import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  return createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))))
  );
}
