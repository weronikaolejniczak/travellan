import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import commonReducer from './common/state/Reducer';
import authReducer from './domains/user/state/Reducer';

const rootReducer = combineReducers({
  trips: commonReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
