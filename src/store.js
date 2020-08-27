import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
/** REDUCERS */
// Trips reducer.
import commonReducer from './common/state/Reducer';
// Authorization reducer.
import authReducer from './domains/user/state/Reducer';

const rootReducer = combineReducers({
  trips: commonReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
