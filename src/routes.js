import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import StartupScreen, {
  StartupScreenOptions,
} from 'user/containers/StartupScreen';
import Auth, {authOptions} from 'user/containers/Auth';
import Register from 'user/containers/Register';
import TripsOverview, {
  tripsOverviewOptions,
} from 'trips/containers/overview/TripsOverview';
import TripDetails, {
  tripDetailsOptions,
} from 'trips/containers/details/TripDetails';
import NewTrip from 'trips/containers/newTrip/NewTrip';
import Transport, {
  transportOptions,
} from 'transport/containers/overview/Transport';
import AddTransport from 'transport/containers/addTransport/AddTransport';
import AddQR from 'transport/containers/addQR/AddQR';
import AccommodationOverview, {
  accommodationOptions,
} from 'accommodation/containers/overview/AccommodationOverview';
import AddAccommodation from 'accommodation/containers/addAccommodation/AddAccommodation';
import Budget, {budgetOptions} from 'budget/containers/overview/Budget';
import AddCurrency from 'budget/containers/addCurrency/AddCurrency';
import NotesOverview, {notesOptions} from 'notes/containers/overview/NotesOverview';
import AddNote from 'notes/containers/addNote/AddNote';
import EditNote from 'notes/containers/editNote/EditNote';
import Map from 'map/containers/Map';
import Weather from 'weather/containers/Weather';

import Colors from 'constants/Colors';
//import DrawerNavigator from './DrawerNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="My trips">
      <Drawer.Screen name="My trips" component={TripsOverview}/>
    </Drawer.Navigator>
  )
}
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultNavOptions}>
        <Stack.Screen
          name="Startup"
          component={StartupScreen}
          options={StartupScreenOptions}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={authOptions}
        />
        <Stack.Screen name="Auth" component={Auth} options={authOptions} />

        <Stack.Screen
          name="My trips"
          component={DrawerNavigator}
          options={tripsOverviewOptions}
        />
        <Stack.Screen name="New trip" component={NewTrip} />
        <Stack.Screen
          name="Details"
          component={TripDetails}
          options={tripDetailsOptions}
        />

        <Stack.Screen
          name="Transport"
          component={Transport}
          options={transportOptions}
        />
        <Stack.Screen name="Add transport" component={AddTransport} />
        <Stack.Screen name="Add QR" component={AddQR} />

        <Stack.Screen
          name="Accommodation"
          component={AccommodationOverview}
          options={accommodationOptions}
        />
        <Stack.Screen name="Add accommodation" component={AddAccommodation} />

        <Stack.Screen
          name="Budget"
          component={Budget}
          options={budgetOptions}
        />
        <Stack.Screen name="Add currency" component={AddCurrency} />

        <Stack.Screen
          name="Notes"
          component={NotesOverview}
          options={notesOptions}
        />
        <Stack.Screen name="Add note" component={AddNote} />
        <Stack.Screen name="Edit Note" component={EditNote} />

        <Stack.Screen
          name="Map"
          component={Map}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Weather" component={Weather} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
/** 
function TripsOverview() {
  return (
    <DrawerNavigator
  )
}
*/
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
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 7,
  },
};