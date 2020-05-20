import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
/** REDUCERS */
import tripsReducer from '../Stores/Reducers/Trips';
import accommodationReducer from '../Stores/Reducers/Accommodation';
import notesReducer from '../Stores/Reducers/Notes';
import weatherReducer from '../Stores/Reducers/Weather';

const rootReducer = combineReducers({
  trips: tripsReducer,
  accommodation: accommodationReducer,
  notes: notesReducer,
  weather: weatherReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
