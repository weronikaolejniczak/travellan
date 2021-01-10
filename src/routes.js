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
import AddAccommodationByNameContainer from 'domains/accommodation/containers/AddAccommodationByNameContainer';
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
import EditNoteContainer from 'domains/notes/containers/EditNoteContainer';
import ForgotPasswordContainer, {
  forgotOptions,
} from 'domains/user/containers/ForgotPasswordContainer';
import MapContainer from 'domains/map/containers/MapContainer';
import NotesContainer, {
  notesOptions,
} from 'domains/notes/containers/NotesContainer';
import NotificationContainer from 'domains/user/containers/NotificationContainer';
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

import * as userActions from 'src/actions/userActions.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Layout } from 'constants';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  <SafeAreaView
    style={Layout.fill}
    forceInset={{ horizontal: 'never', top: 'always' }}
  >
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
    <View>
      <DrawerItem
        label={() => <Text>Notifications</Text>}
        onPress={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <DrawerItem
        label={() => <Text>Logout</Text>}
        icon={() => <Icon name="logout" size={18} />}
        onPress={() => {
          userActions.logout();
          props.navigation.navigate('Startup');
        }}
      />
    </View>
  </SafeAreaView>
);

const AltSpace = () => (
  <Stack.Screen
    name="My trips"
    component={TripsContainer}
    options={tripsOptions}
  />
);

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerType="front"
        backBehavior="none"
      >
        <Drawer.Screen name="Navigation" component={Navigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const Navigation = () => (
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
      name="Forgot"
      component={ForgotPasswordContainer}
      options={forgotOptions}
    />
    <Stack.Screen
      name="My trips"
      component={TripsContainer}
      options={tripsOptions}
    />
    <Stack.Screen name="Notification" component={NotificationContainer} />
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
      name="Add accommodation by name"
      component={AddAccommodationByNameContainer}
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
);

const defaultNavOptions = {
  headerTintColor: Colors.text,
  headerTitleStyle: {
    fontWeight: 'bold',
    textShadowColor: Colors.transparentShadow,
    textShadowOffset: { height: 1, width: 1 },
    textShadowRadius: 7,
  },
  headerTransparent: {
    backgroundColor: Colors.transparent,
  },
};
