import { combineReducers } from 'redux';

import authReducer from './user/userReducer';
import tripReducer from './trip/tripReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  trips: tripReducer,
});

export default rootReducer;
