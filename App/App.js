import React from 'react';
import {Provider} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import {store} from './Stores/index';
import Navigation from './Services/NavigationService';

/** Main application function */
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
