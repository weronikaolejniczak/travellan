/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {useSelector, setState} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// imports from within the module
import {mapStyle} from './MapScreenStyle';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import {
  Platform, Button, View}
from 'react-native';


const MapScreen = (props) => {

  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  const extractRegion = () => {
    return selectedTrip.region;
  };

  const [currentPosition, setCurrentPosition] = useState(selectedTrip.region)

  useEffect(() => {
    Geolocation.getCurrentPosition(position=>{
      //console.log(JSON.stringify(position))
      const { longitude, latitude} = position.coords
      setCurrentPosition({
        ...currentPosition,
        longitude,
        latitude,
      })
    }, error => alert(error.message),
    {timeout: 20000, maximumAge: 1000})

    
  }, [])

  const [marker, setNewMarker]= useState(selectedTrip.region)

  const getMarkerCoords = (coords) => {
    const { longitude, latitude }= coords.nativeEvent.coordinate
    setNewMarker({
      ...marker,
      longitude,
      latitude,
    })
  };
  
  
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex: 1}}
      customMapStyle={mapStyle}
      initialRegion={extractRegion()}
      showsUserLocation={true}
      showsMyLocationButton={true}
      onPress={ (event) => getMarkerCoords(event)}
    >
      <Marker
      coordinate={marker}>
      </Marker>
      
    </MapView>
    
  );

};

export default MapScreen;
