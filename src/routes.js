import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { Linking, SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AccommodationContainer, {
  accommodationOptions,
} from 'domains/accommodation/containers/AccommodationContainer';
import AddAccommodationByNameContainer from 'domains/accommodation/containers/AddAccommodationByNameContainer';
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
import EditTripContainer from 'domains/trips/containers/EditTripContainer';
import ForgotPasswordContainer, {
  forgotOptions,
} from 'domains/user/containers/ForgotPasswordContainer';
import HotelRecommendationContainer from 'domains/accommodation/containers/HotelRecommendationContainer';
import MapContainer from 'domains/map/containers/MapContainer';
import NotesContainer, {
  notesOptions,
} from 'domains/notes/containers/NotesContainer';
import NotificationContainer from 'domains/user/containers/NotificationContainer';
import RecommendedHotelDetailsContainer from 'domains/accommodation/containers/RecommendedHotelDetailsContainer';
import RegisterContainer from 'domains/user/containers/RegisterContainer';
import SharingContainer from 'domains/share/containers/SharingContainer';
import StartupContainer, {
  startupOptions,
} from 'domains/user/containers/StartupContainer';
import TransportContainer from 'domains/transport/containers/TransportContainer';
import TripDetailsContainer, {
  tripDetailsOptions,
} from 'domains/trips/containers/TripDetailsContainer';
import TripsContainer, {
  tripsOptions,
} from 'domains/trips/containers/TripsContainer';
import WeatherContainer from 'domains/weather/containers/WeatherContainer';

import * as userActions from 'src/actions/userActions.js';
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
        label={() => <Text>Travellan Share</Text>}
        icon={() => <Icon name="share" size={18} />}
        onPress={() => {
          props.navigation.navigate('Sharing');
        }}
      />
      <DrawerItem
        label={() => <Text>Notifications</Text>}
        icon={() => <Icon name="notification-clear-all" size={18} />}
        onPress={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <DrawerItem
        label={() => <Text>Privacy Policy</Text>}
        icon={() => <Icon name="police-badge" size={18} />}
        onPress={() => {
          Linking.openURL('https://travellan.flycricket.io/privacy.html');
        }}
      />
      <DrawerItem
        label={() => <Text>Logout</Text>}
        icon={() => <Icon name="logout" size={18} />}
        onPress={() => {
          userActions.logout();
          props.navigation.navigate('Auth');
        }}
      />
    </View>
  </SafeAreaView>
);

const Trips = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen
      name="My trips"
      component={TripsContainer}
      options={tripsOptions}
    />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={defaultNavOptions}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerType="front"
    backBehavior="none"
  >
    <Drawer.Screen name="My trips" component={Trips} options={tripsOptions} />
  </Drawer.Navigator>
);

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultNavOptions}>
        <Stack.Screen
          name="Auth"
          component={AuthenticationContainer}
          options={authOptions}
        />
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
          name="My trips"
          component={DrawerNavigator}
          options={authOptions}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPasswordContainer}
          options={forgotOptions}
        />
        <Stack.Screen name="Notification" component={NotificationContainer} />
        <Stack.Screen name="Sharing" component={SharingContainer} />
        <Stack.Screen name="Add trip" component={AddTripContainer} />
        <Stack.Screen name="Edit trip" component={EditTripContainer} />
        <Stack.Screen
          name="Details"
          component={TripDetailsContainer}
          options={tripDetailsOptions}
        />
        <Stack.Screen name="Transport" component={TransportContainer} />
        <Stack.Screen name="Add transport" component={AddTransportContainer} />
        <Stack.Screen name="Add QR" component={AddQRContainer} />
        <Stack.Screen
          name="Accommodation"
          component={AccommodationContainer}
          options={accommodationOptions}
        />
        <Stack.Screen
          name="Add hotel by name"
          component={AddAccommodationByNameContainer}
        />
        <Stack.Screen
          name="Hotel recommendation"
          component={HotelRecommendationContainer}
        />
        <Stack.Screen
          name="Recommended hotel details"
          component={RecommendedHotelDetailsContainer}
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
  headerLeftContainerStyle: {
    textShadowColor: Colors.cards,
    textShadowOffset: { height: 2, width: 2 },
    textShadowRadius: 15,
  },
  headerTintColor: Colors.text,
  headerTitleStyle: {
    fontWeight: 'bold',
    textShadowColor: Colors.cards,
    textShadowOffset: { height: 2, width: 2 },
    textShadowRadius: 15,
  },
  headerTransparent: {
    backgroundColor: Colors.transparent,
  },
};
