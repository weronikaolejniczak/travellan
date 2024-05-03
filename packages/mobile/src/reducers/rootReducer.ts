import { combineReducers } from 'redux';

import commonReducer from './commonReducer';
import authReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  trips: commonReducer,
});

export default rootReducer;
