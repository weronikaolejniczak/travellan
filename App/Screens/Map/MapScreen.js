/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {useSelector} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// imports from within the module
import {mapStyle} from './MapScreenStyle';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import {
  Platform
} from 'react-native';


const MapScreen = (props) => {

  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  const extractRegion = () => {
    return selectedTrip.region;
  };

  
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex: 1}}
      customMapStyle={mapStyle}
      initialRegion={extractRegion()}
      showsUserLocation={true}
    >
      <Marker
      coordinate={extractRegion()}
      title={selectedTrip.destination}
      >
      </Marker>

    </MapView>
  );

};

export default MapScreen;
