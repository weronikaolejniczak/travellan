import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import * as mapActions from 'actions/mapActions';
import PointOfInterest from 'domains/map/models/PointOfInterest';
import Toolbar from 'domains/map/components/toolbar/Toolbar';
import PlaceOverview from 'domains/map/components/placeOverview/PlaceOverview';
import {darkModeMap} from './DarkModeMap';
import {styles} from './MapContainerStyle';
import Colors from 'constants/Colors';

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
    const {latitude, longitude} = coords.nativeEvent.coordinate;
    let marker = markers.filter(
      (item) => item.lat === latitude && item.lon === longitude,
    )[0];

    if (deletingMarkerActive) {
      setMarkers(markers.filter((item) => item.id !== marker.id));
    } else {
      setActiveMarker(marker);
    }
  };

  const mapOnPressHandler = async (coords) => {
    const {latitude, longitude} = coords.nativeEvent.coordinate;

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
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.flex}
        customMapStyle={darkModeMap}
        initialRegion={extractRegion()}
        onRegionChangeComplete={(region) => setCurrentRegion(region)}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
        loadingIndicatorColor={Colors.primary}
        loadingBackgroundColor={Colors.background}
        tintColor={Colors.primary}
        onPress={(event) => mapOnPressHandler(event)}>
        {!!markers &&
          markers.map((marker) => (
            <MapView.Marker
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lon,
              }}
              pinColor={Colors.primary}
              onPress={(event) => markerOnPressHandler(event)}>
              <MapView.Callout onPress={() => setShowPlaceInfo(true)}>
                <Text>{marker.title}</Text>
              </MapView.Callout>
            </MapView.Marker>
          ))}
      </MapView>

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
