import React from 'react';
import {Provider} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import {store} from './stores/index';
import Navigation from './services/NavigationService';

/** Main application function */
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
