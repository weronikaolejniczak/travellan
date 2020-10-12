import {combineReducers} from 'redux';
import commonReducer from './common/state/Reducer';
import authReducer from './domains/user/state/Reducer';

const rootReducer = combineReducers({
  trips: commonReducer,
  auth: authReducer,
});

export default rootReducer;
