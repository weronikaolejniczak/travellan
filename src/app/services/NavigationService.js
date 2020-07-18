import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  //createSwitchNavigator,
} from '@react-navigation/stack';

/** SCREENS */
/** AUTHORIZATION/LOGIN/SIGNUP SCREEN */
import AuthScreen, {authScreenOptions} from '../screens/user/AuthScreen';
/** TRIP OVERVIEW SCREEN */
import TripsOverviewScreen, {
  tripsScreenOptions,
} from '../screens/trips/TripsOverviewScreen';
/** TRIP DETAIL SCREEN */
import TripDetailScreen, {
  tripDetailScreenOptions,
} from '../screens/trips/TripDetailScreen';
/** 'CREATE A NEW TRIP' SCREEN */
import NewTripScreen, {
  newTripScreenOptions,
} from '../screens/trips/NewTripScreen';
/** TRANSPORT SCREENS */
import TransportScreen, {
  transportScreenOptions,
} from '../screens/transport/TransportScreen';
import AddTransportScreen from '../screens/transport/AddTransportScreen';
/** ACCOMMODATION SCREENS */
import AccommodationScreen, {
  accommodationScreenOptions,
} from '../screens/accommodation/AccommodationScreen';
import AddAccommodationScreen from '../screens/accommodation/AddAccommodationScreen';
/** MAP SCREEN */
import MapScreen from '../screens/map/MapScreen';
/** WEATHER SCREEN */
import WeatherScreen from '../screens/weather/WeatherScreen';
/** BUDGET SCREEN */
import BudgetScreen, {
  budgetScreenOptions,
} from '../screens/budget/BudgetScreen';
import AddCurrency from '../screens/budget/AddCurrencyScreen';
/** NOTES SCREENS */
import NotesScreen, {notesScreenOptions} from '../screens/notes/NotesScreen';
import AddNote from '../screens/notes/AddNoteScreen';
/** CONSTANTS */
import Colors from '../constants/Colors';

/** STACK NAVIGATOR */
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultNavOptions}>
        {/* AUTHENTICATION */}
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={authScreenOptions}
        />
        {/* TRIP FLOW */}
        <Stack.Screen
          name="My trips"
          component={TripsOverviewScreen}
          options={tripsScreenOptions}
        />
        <Stack.Screen
          name="Create a trip"
          component={NewTripScreen}
          options={newTripScreenOptions}
        />
        <Stack.Screen
          name="Details"
          component={TripDetailScreen}
          options={tripDetailScreenOptions}
        />
        {/* TRANSPORT */}
        <Stack.Screen
          name="Transport"
          component={TransportScreen}
          options={transportScreenOptions}
        />
        <Stack.Screen name="Add transport" component={AddTransportScreen} />
        {/* ACCOMMODATION */}
        <Stack.Screen
          name="Housing"
          component={AccommodationScreen}
          options={accommodationScreenOptions}
        />
        <Stack.Screen
          name="Add accommodation"
          component={AddAccommodationScreen}
        />
        {/* MAP */}
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{headerShown: false}}
        />
        {/* WEATHER */}
        <Stack.Screen name="Weather" component={WeatherScreen} />
        {/* BUDGET */}
        <Stack.Screen
          name="Budget"
          component={BudgetScreen}
          options={budgetScreenOptions}
        />
        <Stack.Screen name="Add currency" component={AddCurrency} />
        {/* NOTES */}
        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={notesScreenOptions}
        />
        <Stack.Screen name="Add note" component={AddNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/** DEFAULT NAVIGATION OPTIONS */
const defaultNavOptions = {
  headerTransparent: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
  },
  headerStyle: {
    backgroundColor: Colors.background,
  },
  headerTintColor: Colors.text,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
