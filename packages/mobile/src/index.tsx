import Navigation from './routes';
import React from 'react';
import { DarkTheme } from 'themes';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';

export default function App() {
  return (
    <PaperProvider theme={DarkTheme}>
      <StoreProvider store={store}>
        <Navigation />
      </StoreProvider>
    </PaperProvider>
  );
}
