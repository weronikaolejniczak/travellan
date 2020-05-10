import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
/** REDUCERS */
import tripsReducer from '../Stores/Reducers/Trips';
import notesReducer from '../Stores/Reducers/Notes';

const rootReducer = combineReducers({
  trips: tripsReducer,
  notes: notesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
