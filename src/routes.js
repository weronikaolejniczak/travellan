import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

/** SCREENS */
// Authorization/login and signup containers.
import Auth, {authOptions} from 'user/containers/Auth';
// Trip overview container.
import TripsOverview, {
  tripsOverviewOptions,
} from 'myTrips/containers/TripsOverview';
// Trip details container.
import TripDetails, {tripDetailsOptions} from 'myTrips/containers/TripDetails';
// Creating a new trip container.
import NewTrip, {newTripOptions} from 'myTrips/containers/NewTrip';
// Transport containers.
import Transport, {transportOptions} from 'transport/containers/Transport';
import AddTransport from 'transport/containers/AddTransport';
//import AddQR from 'transport/containers/AddQR';
// Accommodation containers.
import Accommodation, {
  accommodationOptions,
} from 'accommodation/containers/Accommodation';
import AddAccommodation from 'accommodation/containers/AddAccommodation';
// Budget container.
import Budget, {budgetOptions} from 'budget/containers/Budget';
import AddCurrency from 'budget/containers/AddCurrency';
// Notes container.
import Notes, {notesOptions} from 'notes/containers/Notes';
import AddNote from 'notes/containers/AddNote';
// Map container.
import Map from 'map/containers/Map';
// Weather container.
import Weather from 'weather/containers/Weather';

/** CONSTANTS */
import Colors from 'constants/Colors';

/** STACK NAVIGATOR */
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultNavOptions}>
        {/* AUTH */}
        <Stack.Screen name="Auth" component={Auth} options={authOptions} />
        {/* MY TRIPS */}
        <Stack.Screen
          name="My trips"
          component={TripsOverview}
          options={tripsOverviewOptions}
        />
        <Stack.Screen
          name="New trip"
          component={NewTrip}
          options={newTripOptions}
        />
        <Stack.Screen
          name="Details"
          component={TripDetails}
          options={tripDetailsOptions}
        />
        {/* TRANSPORT */}
        <Stack.Screen
          name="Transport"
          component={Transport}
          options={transportOptions}
        />
        <Stack.Screen name="Add transport" component={AddTransport} />
        {/* ACCOMMODATION */}
        <Stack.Screen
          name="Accommodation"
          component={Accommodation}
          options={accommodationOptions}
        />
        <Stack.Screen name="Add accommodation" component={AddAccommodation} />
        {/* BUDGET */}
        <Stack.Screen
          name="Budget"
          component={Budget}
          options={budgetOptions}
        />
        <Stack.Screen name="Add currency" component={AddCurrency} />
        {/* NOTES */}
        <Stack.Screen name="Notes" component={Notes} options={notesOptions} />
        <Stack.Screen name="Add note" component={AddNote} />
        {/* MAP */}
        <Stack.Screen
          name="Map"
          component={Map}
          options={{headerShown: false}}
        />
        {/* WEATHER */}
        <Stack.Screen name="Weather" component={Weather} />
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
