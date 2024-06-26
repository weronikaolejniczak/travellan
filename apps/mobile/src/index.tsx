import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons/HeaderButtonsProvider';
import { Provider as StoreProvider } from 'react-redux';
import { DarkTheme } from 'themes';
import Navigation from './routes';
import { store } from './store';

export default function App() {
  return (
    <PaperProvider theme={DarkTheme}>
      <HeaderButtonsProvider stackType="native">
        <StoreProvider store={store}>
          <Navigation />
        </StoreProvider>
      </HeaderButtonsProvider>
    </PaperProvider>
  );
}
