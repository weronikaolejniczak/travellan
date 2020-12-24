import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AccommodationContainer, {
  accommodationOptions,
} from 'domains/accommodation/containers/AccommodationContainer';
import AddAccommodationContainer from 'domains/accommodation/containers/AddAccommodationContainer';
import AddCurrencyContainer from 'domains/budget/containers/AddCurrencyContainer';
import AddNoteContainer from 'domains/notes/containers/AddNoteContainer';
import AddQRContainer from 'domains/transport/containers/AddQRContainer';
import AddTransportContainer from 'domains/transport/containers/AddTransportContainer';
import AddTripContainer from 'domains/trips/containers/AddTripContainer';
import AuthenticationContainer, {
  authOptions,
} from 'domains/user/containers/AuthenticationContainer';
import BudgetContainer, {
  budgetOptions,
} from 'domains/budget/containers/BudgetContainer';
import Colors from 'constants/Colors';
import EditNoteContainer from 'domains/notes/containers/EditNoteContainer';
import MapContainer from 'domains/map/containers/MapContainer';
import NotesContainer, {
  notesOptions,
} from 'domains/notes/containers/NotesContainer';
import RegisterContainer from 'domains/user/containers/RegisterContainer';
import StartupContainer, {
  startupOptions,
} from 'domains/user/containers/StartupContainer';
import TransportContainer, {
  transportOptions,
} from 'domains/transport/containers/TransportContainer';
import TripDetailsContainer, {
  tripDetailsOptions,
} from 'domains/trips/containers/TripDetailsContainer';
import TripsContainer, {
  tripsOptions,
} from 'domains/trips/containers/TripsContainer';
import WeatherContainer from 'domains/weather/containers/WeatherContainer';

import * as authFunc from 'src/actions/userActions.js';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/** iN THIS FUNCTION YOU MAY DEFINE NEW ITEMS IN THE DRAWER LIST */
function CustomDrawerContent(props) {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <DrawerItem
          label={() => <Text style={{ fontWeight: 'bold' }}> Logout </Text>}
          icon={() => <CommunityIcon name="logout" style={{ fontSize: 30 }} />}
          onPress={() => {
            authFunc.logout();
            props.navigation.navigate('Startup');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerType="front"
      backBehavior="none"
    >
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
        <Stack.Screen name="Edit note" component={EditNoteContainer} />
        <Stack.Screen
          name="Map"
          component={MapContainer}
          options={{ headerShown: false }}
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
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7,
  },
};
