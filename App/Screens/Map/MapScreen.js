/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, setState} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
/* import {request, PERMISSIONS} from 'react-native-permissions'; */
/* IMPORTS FROM WITHIN THE MODULE */
import {mapStyle} from './MapScreenStyle';
import Colors from '../../Constants/Colors';

const MapScreen = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const extractRegion = () => {
    return selectedTrip.region;
  };

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [currentPosition, setCurrentPosition] = useState(selectedTrip.region);
  const [markers, setMarkers] = useState([]);
  const [addingMarkerActive, setAddingMarkerActive] = useState(false);
  const [deletingMarkerActive, setDeletingMarkerActive] = useState(false);
  const [routeActive, setRouteActive] = useState(false);
  const [mapSearchActive, setMapSearchActive] = useState(false);
  const [placeToSearch, setPlaceToSearch] = useState('');

  /** HANDLERS */
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        //console.log(JSON.stringify(position))
        const {longitude, latitude} = position.coords;
        setCurrentPosition({
          ...currentPosition,
          longitude,
          latitude,
        });
      },
      (error) => console.log(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  }, [currentPosition]);

  const addingActivityHandler = () => {
    if (!addingMarkerActive) {
      setDeletingMarkerActive(false);
      setMapSearchActive(false);
      setRouteActive(false);
    }
    setAddingMarkerActive(!addingMarkerActive);
  };

  const deletingActivityHandler = () => {
    if (!deletingMarkerActive) {
      setAddingMarkerActive(false);
      setMapSearchActive(false);
      setRouteActive(false);
    }
    setDeletingMarkerActive(!deletingMarkerActive);
  };

  const routeActivityHandler = () => {
    if (!routeActive) {
      setAddingMarkerActive(false);
      setDeletingMarkerActive(false);
      setMapSearchActive(false);
    }
    setRouteActive(!routeActive);
  };

  const searchActivityHandler = () => {
    if (!mapSearchActive) {
      setAddingMarkerActive(false);
      setDeletingMarkerActive(false);
      setRouteActive(false);
    }
    setMapSearchActive(!mapSearchActive);
  };

  const getMarkerCoords = (coords) => {
    const {longitude, latitude} = coords.nativeEvent.coordinate;
    const title = '';
    setMarkers([...markers, {title, longitude, latitude}]);
  };

  return (
    <View style={styles.flex}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.flex}
        customMapStyle={mapStyle}
        initialRegion={extractRegion()}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={(event) => addingMarkerActive && getMarkerCoords(event)}>
        {markers.map(
          (marker) =>
            markers && (
              <MapView.Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}
              />
            ),
        )}
      </MapView>
      <View style={styles.overlay}>
        <View style={styles.actionBar}>
          {/* ADD MARKER */}
          <View
            style={{
              backgroundColor: addingMarkerActive
                ? Colors.background
                : Colors.cards,
            }}>
            <TouchableOpacity
              styles={styles.button}
              onPress={addingActivityHandler}>
              <Icon name="map-marker-plus" style={styles.icon} />
            </TouchableOpacity>
          </View>
          {/* DELETE MARKER */}
          <View
            style={{
              backgroundColor: deletingMarkerActive
                ? Colors.background
                : Colors.cards,
            }}>
            <TouchableOpacity
              styles={styles.button}
              onPress={deletingActivityHandler}>
              <Icon name="map-marker-minus" style={styles.icon} />
            </TouchableOpacity>
          </View>
          {/* SEE A ROUTE BETWEEN TWO MARKERS */}
          <View
            style={{
              backgroundColor: routeActive ? Colors.background : Colors.cards,
            }}>
            <TouchableOpacity
              styles={styles.button}
              onPress={routeActivityHandler}>
              <Icon name="map-marker-path" style={styles.icon} />
            </TouchableOpacity>
          </View>
          {/* SEARCH FOR PLACE */}
          <View
            style={{
              backgroundColor: mapSearchActive
                ? Colors.background
                : Colors.cards,
            }}>
            <TouchableOpacity
              styles={styles.button}
              onPress={searchActivityHandler}>
              <Icon name="map-search" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        {/** SEARCH BAR */}
        <View style={{alignItems: 'center'}}>
          {mapSearchActive && (
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Address or name of place"
                placeholderTextColor={'grey'}
                style={styles.input}
                onChangeText={(text) => setPlaceToSearch(text)}
                value={placeToSearch}
              />
              <View style={{position: 'absolute', right: 0}}>
                <TouchableOpacity styles={styles.button}>
                  <MaterialIcon name="search" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  flex: {
    flex: 1,
  },
  overlay: {
    top: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.cards,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchBar: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.cards,
  },
  input: {
    width: '100%',
    padding: 15,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: Colors.text,
    fontSize: 14,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.text,
    padding: 20,
  },
  icon: {
    padding: 15,
    fontSize: 28,
    color: Colors.text,
  },
  text: {
    color: Colors.text,
  },
});

export default MapScreen;
