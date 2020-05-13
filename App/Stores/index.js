import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
/** REDUCERS */
import tripsReducer from '../Stores/Reducers/Trips';
import accommodationReducer from '../Stores/Reducers/Accommodation';
import notesReducer from '../Stores/Reducers/Notes';

const rootReducer = combineReducers({
  trips: tripsReducer,
  accommodation: accommodationReducer,
  notes: notesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
