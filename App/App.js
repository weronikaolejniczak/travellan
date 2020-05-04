import 'react-native-gesture-handler';
import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {composeWithDevTools} from 'redux-devtools-extension'; // for debugging purposes
/**
 * Imports from within the module
 */
//
import tripsReducer from './Stores/Reducers/Trips';
//
import Colors from './Constants/Colors';
//
import TripsOverviewScreen, {
  tripsScreenOptions,
} from './Screens/MyTrips/TripsOverviewScreen';
import TripDetailScreen, {
  tripDetailScreenOptions,
} from './Screens/MyTrips/TripDetailScreen';
//
import NewTripScreen from './Screens/MyTrips/NewTripScreen';
//
import TransportScreen from './Screens/Transport/TransportScreen';
import AccommodationScreen from './Screens/Accommodation/AccommodationScreen';
import MapScreen from './Screens/Map/MapScreen';
import DailyPlanScreen from './Screens/Functionalities/DailyPlanScreen';
import WeatherScreen from './Screens/Functionalities/WeatherScreen';
import BudgetScreen from './Screens/Functionalities/BudgetScreen';
import NotesScreen from './Screens/Functionalities/NotesScreen';

// refactor combineReducers to be elsewhere
const rootReducer = combineReducers({
  trips: tripsReducer,
});

// delete devtools before deployment
const store = createStore(rootReducer, composeWithDevTools());

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
          <Stack.Screen name="Transport" component={TransportScreen} />
          <Stack.Screen name="Accommodation" component={AccommodationScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Daily plan" component={DailyPlanScreen} />
          <Stack.Screen name="Weather" component={WeatherScreen} />
          <Stack.Screen name="Budget" component={BudgetScreen} />
          <Stack.Screen name="Notes" component={NotesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
