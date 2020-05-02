import 'react-native-gesture-handler';
import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// imports from within the module
import tripsReducer from './Stores/Reducers/Trips';
import TripsOverviewScreen, {
  tripsScreenOptions,
} from './Screens/MyTrips/TripsOverviewScreen';
import NewTripScreen from './Screens/MyTrips/NewTripScreen';
import TripDetailScreen, {
  tripDetailScreenOptions,
} from './Screens/MyTrips/TripDetailScreen';
import Colors from './Constants/Colors';

// refactor combineReducers to be elsewhere
const rootReducer = combineReducers({
  trips: tripsReducer,
});

const store = createStore(rootReducer);

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

/**
 * Main application function
 * with navigation;
 * REFACTOR
 */
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultNavOptions}>
          <Stack.Screen
            name="My trips"
            component={TripsOverviewScreen}
            options={tripsScreenOptions}
          />
          <Stack.Screen name="Create a trip" component={NewTripScreen} />
          <Stack.Screen
            name="Details"
            component={TripDetailScreen}
            options={tripDetailScreenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
