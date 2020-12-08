import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import { Navigation } from "./routes";

//import Navigation from './routes';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="My trips" component={Navigation} />
    </Drawer.Navigator>

  );
};

export default DrawerNavigator;
