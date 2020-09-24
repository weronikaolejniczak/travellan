import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

/**
screens
*/
// authorization/login and signup
import StartupScreen, {
  StartupScreenOptions,
} from 'user/containers/StartupScreen';
import Auth, {authOptions} from 'user/containers/Auth';
// general trip handling
import TripsOverview, {
  tripsOverviewOptions,
} from 'myTrips/containers/overview/TripsOverview';
import TripDetails, {
  tripDetailsOptions,
} from 'myTrips/containers/details/TripDetails';
import NewTrip from 'myTrips/containers/newTrip/NewTrip';
// transport
import Transport, {
  transportOptions,
} from 'transport/containers/overview/Transport';
import AddTransport from 'transport/containers/addTransport/AddTransport';
import AddQR from 'transport/containers/addQR/AddQR';
// accommodation
import Accommodation, {
  accommodationOptions,
} from 'accommodation/containers/overview/Accommodation';
import AddAccommodation from 'accommodation/containers/addAccommodation/AddAccommodation';
// budget
import Budget, {budgetOptions} from 'budget/containers/Budget';
import AddCurrency from 'budget/containers/AddCurrency';
// notes
import Notes, {notesOptions} from 'notes/containers/overview/Notes';
import AddNote from 'notes/containers/addNote/AddNote';
// map
import Map from 'map/containers/Map';
// weather
import Weather from 'weather/containers/Weather';

/**
constants
*/
import Colors from 'constants/Colors';

/** 
stack navigator
*/
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultNavOptions}>
        {/* STARTING SCREEN */}
        <Stack.Screen
          name="Startup"
          component={StartupScreen}
          options={StartupScreenOptions}
        />
        {/* AUTH */}
        <Stack.Screen name="Auth" component={Auth} options={authOptions} />
        {/* MY TRIPS */}
        <Stack.Screen
          name="My trips"
          component={TripsOverview}
          options={tripsOverviewOptions}
        />
        <Stack.Screen name="New trip" component={NewTrip} />
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
        <Stack.Screen name="Add QR" component={AddQR} />
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

/** 
default navigation options - transparent navigation bar
*/
const defaultNavOptions = {
  headerTransparent: {
    position: 'absolute',
    backgroundColor: Colors.transparent,
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
    textShadowColor: Colors.transparentBlack,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 7,
  },
};
