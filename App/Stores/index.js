import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
/** REDUCERS */
import tripsReducer from '../Stores/Reducers/Trips';
import authReducer from '../Stores/Reducers/Auth';

const rootReducer = combineReducers({
  trips: tripsReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
