import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import Navigation from './routes';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <DrawerNavigator.Navigator>
      <Drawer.Screen name="My trips" component={Navigation.TripsOverview} />
      <Drawer.Screen name="Contact" component={Navigation}></Drawer.Screen>
    </DrawerNavigator.Navigator>

  );
};

export default DrawerNavigator;
