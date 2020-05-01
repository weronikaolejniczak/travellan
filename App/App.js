import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button } from 'react-native'

import tripsReducer from './Stores/Reducers/Trips';
import TripsOverviewScreen from './Screens/MyTrips/TripsOverviewScreen';
import NewTripScreen from './Screens/MyTrips/NewTripScreen';
import Colors from './Constants/Colors';

const rootReducer = combineReducers({
  trips: tripsReducer,
});

const store = createStore(rootReducer);

const Stack = createStackNavigator();

/**
 * Main application function
 */
export default function App() {
  return (



    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="My trips" component={TripsOverviewScreen}
            options={{
              headerRight: () => (
                <TouchableOpacity  activeOpacity={0.5}>
                  <Image
                    component={NewTripScreen}
                    source={require('./Images/plusSign.png')}
                  />

                </TouchableOpacity>
                
              ),
                
              }
            } />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
