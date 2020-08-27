/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/index';
import Share from 'domains/share/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('TravellanShare', () => Share);
