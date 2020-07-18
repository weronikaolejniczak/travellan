/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app/App';
import Share from './src/share/Share';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('TravellanShare', () => Share);
