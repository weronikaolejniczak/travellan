import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
/** IMPORTS FROM WITHIN THE MODULE */
import tripsReducer from './Stores/Reducers/Trips';
import notesReducer from './Stores/Reducers/Notes';
import Navigation from './Services/NavigationService';

// refactor combineReducers to be elsewhere
const rootReducer = combineReducers({
  trips: tripsReducer,
  notes: notesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

/** Main application function
 */
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
