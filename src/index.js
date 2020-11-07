import React from 'react';
import {Provider} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import {store} from './store';
import Navigation from './routes';

/** Main application function */
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
