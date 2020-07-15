/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App/App';
import Share from './Share/Share';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('Travellan', () => Share);
