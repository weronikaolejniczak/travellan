/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useSelector} from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// imports from within the module
import {mapStyle} from './MapScreenStyle';

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
    />
  );
};

export default MapScreen;
