import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@react-native-mapbox-gl/maps';
import React, { useEffect, useState } from 'react';
import { MAPBOX_KEY } from 'react-native-dotenv';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PointOfInterest from 'models/PointOfInterest';
import { Toolbar } from '../components';
import { fetchMapRequest, patchMapRequest } from 'actions/mapActions';
import { styles } from './MapContainerStyle';

MapboxGL.setAccessToken(MAPBOX_KEY);
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
  const [searchQuerry, setSearchQuerry] = useState('');
  const [markerTitle, setMarkerTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
        onSelected={(event) => markerOnPressHandler(event)}
      >
        <MapboxGL.Callout title={marker.title} />
      </MapboxGL.PointAnnotation>
    ));

  const activityHandler = (type) => {
    switch (type) {
      case 'adding':
        if (!addingMarkerActive) {
          setDeletingMarkerActive(false);
        } else {
          setMarkerTitle('');
        }
        setAddingMarkerActive(!addingMarkerActive);
        break;
      case 'deleting':
        if (!deletingMarkerActive) {
          setAddingMarkerActive(false);
          setMarkerTitle('');
        }
        setDeletingMarkerActive(!deletingMarkerActive);
        break;
      case 'searching':
        if (!searchingActive) {
          setDeletingMarkerActive(false);
          setAddingMarkerActive(false);
        } else {
          setSearchQuerry('');
        }
        setSearchingActive(!searchingActive);
        break;
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
        styleURL="mapbox://styles/travellan/ckixgtxyh5rdn19qo4hka8016"
        onLongPress={(event) => mapOnPressHandler(event)}
        onRegionDidChange={(region) => setCurrentRegion(region)}
      >
        <MapboxGL.Camera
          zoomLevel={10}
          centerCoordinate={[
            extractRegion().longitude,
            extractRegion().latitude,
          ]}
        />
        {renderMarkers()}
        <MapboxGL.UserLocation />
      </MapboxGL.MapView>

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
        error={error}
        setError={setError}
        isLoading={isLoading}
        onExitHandler={onExitHandler}
      />
    </View>
  );
};

export default MapContainer;
