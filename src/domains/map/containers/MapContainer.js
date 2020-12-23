import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from '@react-native-community/geolocation';
import {MAPBOX_KEY} from 'react-native-dotenv';

import * as mapActions from 'actions/mapActions';
import PointOfInterest from 'models/PointOfInterest';
import Toolbar from '../components/toolbar/Toolbar';
import PlaceOverview from '../components/placeOverview/PlaceOverview';
import {styles} from './MapContainerStyle';
import Colors from 'constants/Colors';
import { Marker } from 'react-native-svg';

MapboxGL.setAccessToken(MAPBOX_KEY);
MapboxGL.setConnected(true);

const MapContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );

  const [currentPosition, setCurrentPosition] = useState(selectedTrip.region);
  const [currentRegion, setCurrentRegion] = useState(selectedTrip.region);
  const [markers, setMarkers] = useState(
    selectedTrip.map ? selectedTrip.map.nodes : [],
  );
  const [addingMarkerActive, setAddingMarkerActive] = useState(false);
  const [deletingMarkerActive, setDeletingMarkerActive] = useState(false);
  const [showPlaceInfo, setShowPlaceInfo] = useState(false);
  const [markerTitle, setMarkerTitle] = useState('');
  const [activeMarker, setActiveMarker] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const extractRegion = () => {
    if (selectedTrip.map) {
      if (selectedTrip.map.region) {
        return selectedTrip.map.region;
      } else {
        return selectedTrip.region;
      }
    } else {
      return selectedTrip.region;
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const {longitude, latitude} = position.coords;
        setCurrentPosition({
          ...currentPosition,
          longitude,
          latitude,
        });
      },
      (err) => setError(err.message),
      {timeout: 20000, maximumAge: 1000},
    );
  }, [currentPosition]);

  const activityHandler = (type) => {
    switch (type) {
      case 'adding':
        if (!addingMarkerActive) {
          setDeletingMarkerActive(false);
          setShowPlaceInfo(false);
        } else {
          setMarkerTitle('');
        }
        setAddingMarkerActive(!addingMarkerActive);
        setShowPlaceInfo(false);
        break;
      case 'deleting':
        if (!deletingMarkerActive) {
          setAddingMarkerActive(false);
          setMarkerTitle('');
          setShowPlaceInfo(false);
        }
        setDeletingMarkerActive(!deletingMarkerActive);
        setShowPlaceInfo(false);
        break;
    }
  };

  const onExitHandler = async () => {
   
    setIsLoading(true);
    try {
      await dispatch(
        mapActions.updateMapRequest(tripId, markers, currentRegion),
      ).then(() => {
        setIsLoading(false);
        props.navigation.goBack();
      });
    } catch {
      setError('Something went wrong. Check your internet connection!');
    }
  };

  const markerOnPressHandler = async (coords) => {
    
    const [latitude, longitude] = coords.geometry.coordinates;
    
    let marker = markers.filter(
      (item) => item.lat === latitude && item.lon === longitude,
    )[0];

    if (deletingMarkerActive) {
      setMarkers(markers.filter((item) => item.id !== marker.id));
    } else {
      setActiveMarker(marker);
    }
  };

  const mapOnPressHandler = async (event) => {
    
    const [latitude, longitude] = event.geometry.coordinates;
     
    if (addingMarkerActive) {
      if (markerTitle !== '') {
        const title = markerTitle;
        
        setMarkers(
          markers
            ? [
                ...markers,
                new PointOfInterest(
                  new Date().toString(),
                  latitude,
                  longitude,
                  title,
                ),
              ]
            : [
                new PointOfInterest(
                  new Date().toString(),
                  latitude,
                  longitude,
                  title,
                ),
              ],
        );
        
        setMarkerTitle('');
      } else {
        setError('Enter the title');
      }
    } else {
      setShowPlaceInfo(false);
    }
  };

  return (
    <View style={styles.flex}>
          <MapboxGL.MapView 
            style={styles.map} 
            styleURL='mapbox://styles/travellan/ckixgtxyh5rdn19qo4hka8016'
            onPress={(event) => mapOnPressHandler(event)}
            onRegionDidChange={(region) => setCurrentRegion(region)}>
            <MapboxGL.Camera
              zoomLevel={8}
              centerCoordinate={[extractRegion().longitude,extractRegion().latitude]}
            />
            
            
            {!!markers &&
              markers.map((marker) => (
            <MapboxGL.PointAnnotation
              id={marker.id}
              coordinate={
                [marker.lat, marker.lon]
              }
               onSelected={(event) => markerOnPressHandler(event)}>
              <MapboxGL.Callout title={marker.title}/>
            </MapboxGL.PointAnnotation>
              ))}
            <MapboxGL.UserLocation />
          </MapboxGL.MapView>

      <Toolbar
        styles={styles}
        navigation={props.navigation}
        addingMarkerActive={addingMarkerActive}
        addingActivityHandler={() => activityHandler('adding')}
        markerTitle={markerTitle}
        setMarkerTitle={(text) => setMarkerTitle(text)}
        deletingMarkerActive={deletingMarkerActive}
        deletingActivityHandler={() => activityHandler('deleting')}
        error={error}
        setError={() => setError()}
        isLoading={isLoading}
        onExitHandler={async () => await onExitHandler()}
      />

      {showPlaceInfo && (
        <PlaceOverview styles={styles} activeMarker={activeMarker} />
      )}
    </View>
  );
};

export default MapContainer;
