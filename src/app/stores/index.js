import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
/** REDUCERS */
import tripsReducer from './reducers/Trips';
import authReducer from './reducers/Auth';

const rootReducer = combineReducers({
  trips: tripsReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
