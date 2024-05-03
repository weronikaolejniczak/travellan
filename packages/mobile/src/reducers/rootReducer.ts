import { combineReducers } from 'redux';

import authReducer from './userReducer';
import commonReducer from './commonReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  trips: commonReducer,
});

export default rootReducer;
