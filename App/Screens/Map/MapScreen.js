/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// imports from within the module
import {mapStyle} from './MapScreenStyle';

const MapScreen = (props) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex: 1}}
      customMapStyle={mapStyle}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

export default MapScreen;
