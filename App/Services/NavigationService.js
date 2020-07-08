import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  //createSwitchNavigator,
} from '@react-navigation/stack';

/** SCREENS */
/** AUTHORIZATION/LOGIN/SIGNUP SCREEN */
import AuthScreen, {authScreenOptions} from '../Screens/User/AuthScreen';
/** TRIP OVERVIEW SCREEN */
import TripsOverviewScreen, {
  tripsScreenOptions,
} from '../Screens/MyTrips/TripsOverviewScreen';
/** TRIP DETAIL SCREEN */
import TripDetailScreen, {
  tripDetailScreenOptions,
} from '../Screens/MyTrips/TripDetailScreen';
/** 'CREATE A NEW TRIP' SCREEN */
import NewTripScreen, {
  newTripScreenOptions,
} from '../Screens/MyTrips/NewTripScreen';
/** TRANSPORT SCREENS */
import TransportScreen, {
  transportScreenOptions,
} from '../Screens/Transport/TransportScreen';
import AddTransportScreen from '../Screens/Transport/AddTransportScreen';
/** ACCOMMODATION SCREENS */
import AccommodationScreen, {
  accommodationScreenOptions,
} from '../Screens/Accommodation/AccommodationScreen';
import AddAccommodationScreen from '../Screens/Accommodation/AddAccommodationScreen';
/** MAP SCREEN */
import MapScreen from '../Screens/Map/MapScreen';
/** WEATHER SCREEN */
import WeatherScreen from '../Screens/Weather/WeatherScreen';
/** BUDGET SCREEN */
import BudgetScreen, {
  budgetScreenOptions,
} from '../Screens/Budget/BudgetScreen';
import AddCurrency from '../Screens/Budget/AddCurrencyScreen';
/** NOTES SCREENS */
import NotesScreen, {notesScreenOptions} from '../Screens/Notes/NotesScreen';
import AddNote from '../Screens/Notes/AddNoteScreen';
/** CONSTANTS */
import Colors from '../Constants/Colors';
//import {createAppContainer} from 'react-navigation';

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
        <Stack.Screen name="Map" component={MapScreen} />
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
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.text,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
