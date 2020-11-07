import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import StartupScreen, {
  StartupScreenOptions,
} from 'user/containers/StartupScreen';
import Auth, {authOptions} from 'user/containers/Auth';
import TripsOverview, {
  tripsOverviewOptions,
} from 'trips/containers/overview/TripsOverview';
import TripDetails, {
  tripDetailsOptions,
} from 'trips/containers/details/TripDetails';
import NewTrip from 'trips/containers/newTrip/NewTrip';
import Transport, {transportOptions} from 'transport/containers/Transport';
import AddTransport from 'transport/containers/AddTransport';
import AddQR from 'transport/containers/AddQR';
import Accommodation, {
  accommodationOptions,
} from 'accommodation/containers/Accommodation';
import AddAccommodation from 'accommodation/containers/AddAccommodation';
import Budget, {budgetOptions} from 'budget/containers/Budget';
import AddCurrency from 'budget/containers/AddCurrency';
import Notes, {notesOptions} from 'notes/containers/Notes';
import AddNote from 'notes/containers/AddNote';
import EditNote from 'notes/containers/EditNote';
import Map from 'map/containers/Map';
import Weather from 'weather/containers/Weather';

import Colors from 'constants/Colors';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultNavOptions}>
        <Stack.Screen
          name="Startup"
          component={StartupScreen}
          options={StartupScreenOptions}
        />

        <Stack.Screen name="Auth" component={Auth} options={authOptions} />

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

        <Stack.Screen
          name="Transport"
          component={Transport}
          options={transportOptions}
        />
        <Stack.Screen name="Add transport" component={AddTransport} />
        <Stack.Screen name="Add QR" component={AddQR} />

        <Stack.Screen
          name="Accommodation"
          component={Accommodation}
          options={accommodationOptions}
        />
        <Stack.Screen name="Add accommodation" component={AddAccommodation} />

        <Stack.Screen
          name="Budget"
          component={Budget}
          options={budgetOptions}
        />
        <Stack.Screen name="Add currency" component={AddCurrency} />

        <Stack.Screen name="Notes" component={Notes} options={notesOptions} />
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
