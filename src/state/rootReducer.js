import {combineReducers} from 'redux';

import tripReducer from './trip/tripReducer';
import authReducer from './user/userReducer';

const rootReducer = combineReducers({
  trips: tripReducer,
  auth: authReducer,
});

export default rootReducer;
