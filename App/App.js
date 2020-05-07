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
// reducers
import tripsReducer from './Stores/Reducers/Trips';
import notesReducer from './Stores/Reducers/Notes';
// constants
import Colors from './Constants/Colors';
// trips overview screen
import TripsOverviewScreen, {
  tripsScreenOptions,
} from './Screens/MyTrips/TripsOverviewScreen';
import TripDetailScreen, {
  tripDetailScreenOptions,
} from './Screens/MyTrips/TripDetailScreen';
// 'create a new trip' screen
import NewTripScreen from './Screens/MyTrips/NewTripScreen';
// functionalities screens
import TransportScreen, {
  transportScreenOptions,
} from './Screens/Transport/TransportScreen';
import AccommodationScreen, {
  accommodationScreenOptions,
} from './Screens/Accommodation/AccommodationScreen';
import MapScreen from './Screens/Map/MapScreen';
import DailyPlanScreen from './Screens/DailyPlan/DailyPlanScreen';
import WeatherScreen from './Screens/Weather/WeatherScreen';
import BudgetScreen from './Screens/Budget/BudgetScreen';
import NotesScreen from './Screens/Notes/NotesScreen';
import AddNote from './Screens/Notes/AddNoteScreen';

// refactor combineReducers to be elsewhere
const rootReducer = combineReducers({
  trips: tripsReducer,
  notes: notesReducer,
});

// delete devtools before deployment
const store = createStore(rootReducer, composeWithDevTools());

// stack navigator
const Stack = createStackNavigator();

// default navigation options
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
          <Stack.Screen
            name="Transport"
            component={TransportScreen}
            options={transportScreenOptions}
          />
          <Stack.Screen
            name="Accommodation"
            component={AccommodationScreen}
            options={accommodationScreenOptions}
          />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Daily plan" component={DailyPlanScreen} />
          <Stack.Screen name="Weather" component={WeatherScreen} />
          <Stack.Screen name="Budget" component={BudgetScreen} />
          <Stack.Screen name="Notes" component={NotesScreen} />
          <Stack.Screen name="Add Note" component={AddNote} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
