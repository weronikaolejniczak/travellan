import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@react-native-mapbox-gl/maps';
import React, { useEffect, useState } from 'react';
import { MAPBOX_API_KEY } from 'react-native-dotenv';
import { Alert, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PointOfInterest from 'models/PointOfInterest';
import { Toolbar } from '../components';
import { fetchMapRequest, patchMapRequest } from 'actions/mapActions';
import { styles } from './MapContainerStyle';
import fetchMapSearch from 'services/fetchMapSearch';
import Colors from 'constants/Colors';

MapboxGL.setAccessToken(MAPBOX_API_KEY);
MapboxGL.setConnected(true);

const MapContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
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
  const [searchingActive, setSearchingActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [markerTitle, setMarkerTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [error, setError] = useState(null);

  const extractRegion = () =>
    selectedTrip.map
      ? selectedTrip.map.region
        ? selectedTrip.map.region
        : selectedTrip.region
      : selectedTrip.region;

  const renderMarkers = () =>
    !!markers &&
    markers.map((marker) => (
      <MapboxGL.PointAnnotation
        id={`marker-${marker.id}`}
        coordinate={[marker.lat, marker.lon]}
        onDeselected={(event) => handleDeleteTrip(event, marker.title)}
        selected={isSelected}
      >
        <MapboxGL.Callout title={marker.title} />
      </MapboxGL.PointAnnotation>
    ));

  const activityHandler = (type) => {
    switch (type) {
      case 'adding':
        if (!addingMarkerActive) {
          setDeletingMarkerActive(false);
          setSearchingActive(false);
        } else {
          setMarkerTitle('');
        }
        setAddingMarkerActive(!addingMarkerActive);
        break;
      case 'deleting':
        if (!deletingMarkerActive) {
          setAddingMarkerActive(false);
          setSearchingActive(false);
          setMarkerTitle('');
        }
        setDeletingMarkerActive(!deletingMarkerActive);
        break;
      case 'searching':
        if (!searchingActive) {
          setDeletingMarkerActive(false);
          setAddingMarkerActive(false);
        } else {
          setSearchQuery('');
        }
        setSearchingActive(!searchingActive);
        break;
    }
  };

  const handleDeleteTrip = (event, title) => {
    if (deletingMarkerActive) {
      setIsSelected(false);
      Alert.alert(
        `Delete ${title}`,
        'Are you sure?',
        [
          {
            onPress: () => setIsSelected(false),
            style: 'cancel',
            text: 'Cancel',
          },
          {
            onPress: () => markerOnPressHandler(event),
            text: 'OK',
          },
        ],
        { cancelable: true, onDismiss: () => setIsSelected(false) },
      );
    }
  };

  const onExitHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(patchMapRequest(tripId, markers, currentRegion)).then(
        () => {
          setIsLoading(false);
          navigation.goBack();
        },
      );
    } catch {
      setError('Something went wrong. Check your internet connection!');
    }
  };

  const markerOnPressHandler = async (coords) => {
    const [latitude, longitude] = coords.geometry.coordinates;
    const marker = markers.filter(
      (item) => item.lat === latitude && item.lon === longitude,
    )[0];
    deletingMarkerActive &&
      setMarkers(markers.filter((item) => item.id !== marker.id));
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
                  new Date().getTime().toString(),
                  new Date().toString(),
                  latitude,
                  longitude,
                  title,
                ),
              ]
            : [
                new PointOfInterest(
                  new Date().getTime().toString(),
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
      if (searchingActive) {
        if (searchQuery !== '') {
          setIsLoading(true);
          const searchAnswer = await fetchMapSearch(
            searchQuery,
            latitude,
            longitude,
          );
          const [lat, lon] = searchAnswer.geometry.coordinates;
          const name = searchAnswer.place_name;
          setMarkers(
            markers
              ? [
                  ...markers,
                  new PointOfInterest(
                    new Date().getTime().toString(),
                    new Date().toString(),
                    lat,
                    lon,
                    name,
                  ),
                ]
              : [
                  new PointOfInterest(
                    new Date().getTime().toString(),
                    new Date().toString(),
                    lat,
                    lon,
                    name,
                  ),
                ],
          );
          setSearchQuery('');
          setIsLoading(false);
        } else {
          setError('Enter the query');
        }
      }
    }
  };

  useEffect(() => {
    try {
      // dispatch(fetchMapRequest());
    } catch {
      setError('Something went wrong!');
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      (err) => setError(err.message),
      { maximumAge: 1000, timeout: 20000 },
    );
  }, [currentPosition, dispatch]);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL="mapbox://styles/travellan/ckju6y3ae119l19o6od0j9wi5"
        onLongPress={(event) => mapOnPressHandler(event)}
        // onRegionDidChange={(region) => setCurrentRegion(region)} - left for further debugging
      >
        <MapboxGL.Camera
          zoomLevel={10}
          centerCoordinate={
            // extractRegion().geometry.coordinates - left for further debugging
            [extractRegion().longitude, extractRegion().latitude]
          }
        />
        {renderMarkers()}
        <MapboxGL.UserLocation />
      </MapboxGL.MapView>
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <Toolbar
          styles={styles}
          navigation={navigation}
          addingMarkerActive={addingMarkerActive}
          addingActivityHandler={() => activityHandler('adding')}
          markerTitle={markerTitle}
          setMarkerTitle={(text) => setMarkerTitle(text)}
          deletingMarkerActive={deletingMarkerActive}
          deletingActivityHandler={() => activityHandler('deleting')}
          searchingActive={searchingActive}
          searchingActivityHandler={() => activityHandler('searching')}
          setSearchQuery={(text) => setSearchQuery(text)}
          searchQuery={searchQuery}
          error={error}
          setError={setError}
          isLoading={isLoading}
          onExitHandler={onExitHandler}
        />
      )}
    </View>
  );
};

export default MapContainer;
