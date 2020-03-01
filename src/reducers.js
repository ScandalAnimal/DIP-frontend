import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {registrationProcessReducer} from './reducers/registrationProcessReducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    registration: registrationProcessReducer,
  });
