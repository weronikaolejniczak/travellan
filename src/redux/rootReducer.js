import {combineReducers} from 'redux';
import tripReducer from './trip/tripReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  trips: tripReducer,
  user: userReducer,
});

export default rootReducer;
