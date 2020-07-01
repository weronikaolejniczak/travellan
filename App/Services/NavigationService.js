import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  createSwitchNavigator
} from '@react-navigation/stack';

/** SCREENS */
/** AUTHORIZATION/LOGIN/SIGNUP SCREEN */
import AuthScreen, {authScreenOptions,} from '../Screens/User/AuthScreen';
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
import BudgetScreen from '../Screens/Budget/BudgetScreen';
/** NOTES SCREENS */
import NotesScreen, {notesScreenOptions} from '../Screens/Notes/NotesScreen';
import AddNote from '../Screens/Notes/AddNoteScreen';
/** CONSTANTS */
import Colors from '../Constants/Colors';
import Trip from '../Models/TripModel';
import { createAppContainer } from 'react-navigation';

/** STACK NAVIGATOR */
const Stack = createStackNavigator();




export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultNavOptions}>
       <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={authScreenOptions}
        />
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
        <Stack.Screen
          name="Transport"
          component={TransportScreen}
          options={transportScreenOptions}
        />
        <Stack.Screen
          name="Add transport"
          component={AddTransportScreen}
          //options={transportScreenOptions}
        />
        <Stack.Screen
          name="Housing"
          component={AccommodationScreen}
          options={accommodationScreenOptions}
        />
        <Stack.Screen
          name="Add accommodation"
          component={AddAccommodationScreen}
        />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Budget" component={BudgetScreen} />
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
/** IN THE FUTURE I will change Navigation to this manner( but let it sleep here for know)
const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
  defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Trip : Stack
});

export default createAppContainer(MainNavigator);

*/
