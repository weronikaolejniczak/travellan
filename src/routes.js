import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import StartupContainer, {
  startupOptions,
} from 'domains/user/containers/StartupContainer';
import AuthenticationContainer, {
  authOptions,
} from 'domains/user/containers/AuthenticationContainer';
import RegisterContainer from 'domains/user/containers/RegisterContainer';
import TripsContainer, {
  tripsOptions,
} from 'domains/trips/containers/TripsContainer';
import TripDetailsContainer, {
  tripDetailsOptions,
} from 'domains/trips/containers/TripDetailsContainer';
import AddTripContainer from 'domains/trips/containers/AddTripContainer';
import TransportContainer, {
  transportOptions,
} from 'domains/transport/containers/TransportContainer';
import AddTransportContainer from 'domains/transport/containers/AddTransportContainer';
import AddQRContainer from 'domains/transport/containers/AddQRContainer';
import AccommodationContainer, {
  accommodationOptions,
} from 'domains/accommodation/containers/AccommodationContainer';
import AddAccommodationContainer from 'domains/accommodation/containers/AddAccommodationContainer';
import BudgetContainer, {
  budgetOptions,
} from 'domains/budget/containers/BudgetContainer';
import AddCurrencyContainer from 'domains/budget/containers/AddCurrencyContainer';
import NotesContainer, {
  notesOptions,
} from 'domains/notes/containers/NotesContainer';
import AddNoteContainer from 'domains/notes/containers/AddNoteContainer';
import MapContainer from 'domains/map/containers/MapContainer';
import WeatherContainer from 'domains/weather/containers/WeatherContainer';
import Colors from 'constants/Colors';

import * as auth_func from 'src/actions/userActions.js';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/** IN THIS FUNCTION YOU MAY DEFINE NEW ITEMS IN THE DRAWER LIST */
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label= "Example" onPress={() => alert('This is an example')} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          auth_func.logout();
        }}
      />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerType="front"
      backBehavior="none">
      <Drawer.Screen name="My trips" component={TripsContainer} />
    </Drawer.Navigator>
  );
}
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultNavOptions}>
        <Stack.Screen
          name="Startup"
          component={StartupContainer}
          options={startupOptions}
        />
        <Stack.Screen
          name="Register"
          component={RegisterContainer}
          options={authOptions}
        />
        <Stack.Screen
          name="Auth"
          component={AuthenticationContainer}
          options={authOptions}
        />
        <Stack.Screen
          name="My trips"
          component={DrawerNavigator}
          options={tripsOptions}
        />
        <Stack.Screen name="Add trip" component={AddTripContainer} />
        <Stack.Screen
          name="Details"
          component={TripDetailsContainer}
          options={tripDetailsOptions}
        />
        <Stack.Screen
          name="Transport"
          component={TransportContainer}
          options={transportOptions}
        />
        <Stack.Screen name="Add transport" component={AddTransportContainer} />
        <Stack.Screen name="Add QR" component={AddQRContainer} />
        <Stack.Screen
          name="Accommodation"
          component={AccommodationContainer}
          options={accommodationOptions}
        />
        <Stack.Screen
          name="Add accommodation"
          component={AddAccommodationContainer}
        />
        <Stack.Screen
          name="Budget"
          component={BudgetContainer}
          options={budgetOptions}
        />
        <Stack.Screen name="Add currency" component={AddCurrencyContainer} />
        <Stack.Screen
          name="Notes"
          component={NotesContainer}
          options={notesOptions}
        />
        <Stack.Screen name="Add note" component={AddNoteContainer} />
        <Stack.Screen
          name="Map"
          component={MapContainer}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Weather" component={WeatherContainer} />
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
