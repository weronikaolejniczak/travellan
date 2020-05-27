import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
/** REDUCERS */
import tripsReducer from '../Stores/Reducers/Trips';

const rootReducer = combineReducers({
  trips: tripsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
