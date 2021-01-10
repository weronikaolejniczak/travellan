/**
 * @format
 */

import './wdyr';

import { AppRegistry } from 'react-native';

import App from './src';
import Share from 'domains/share';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('TravellanShare', () => Share);
