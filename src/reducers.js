import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {exampleReducer} from './real/reducers/exampleReducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    example: exampleReducer,
  });
