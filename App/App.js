import 'react-native-gesture-handler';
import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import tripsReducer from './Stores/Reducers/Trips';
import TripsOverviewScreen from './Screens/MyTrips/TripsOverviewScreen';
import Colors from './Constants/Colors';

const rootReducer = combineReducers({
  trips: tripsReducer,
});

const store = createStore(rootReducer);

const Stack = createStackNavigator();

/**
 * Main application function
 */
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="My trips" component={TripsOverviewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
