import React from 'react';
import {Provider} from 'react-redux';

import {store} from 'state/store';
import Navigation from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
