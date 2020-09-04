import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
/* IMPORTS FROM WITHIN THE MODULE */
import {googleMapStyle} from './GoogleMapStyle';
import {mapStyle as styles} from './MapStyle';
import Colors from 'constants/Colors';

const Map = (props) => {
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
  const [showPlaceInfo, setShowPlaceInfo] = useState(false);
  const [placeToSearch, setPlaceToSearch] = useState('');
  // temporary
  const [activeMarker, setActiveMarker] = useState();
  const [markerTitle, setMarkerTitle] = useState('');

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

  // refactor
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

  // handles marker onPress action
  const markerOnPressHandler = (coords) => {
    const {latitude, longitude} = coords.nativeEvent.coordinate;
    if (addingMarkerActive) {
    } else if (deletingMarkerActive) {
      // filter markers so that they exclude the marker with the coordinates
      setMarkers(
        markers.filter(
          (marker) =>
            !(marker.latitude === latitude && marker.longitude === longitude),
        ),
      );
    } else {
      //setShowPlaceInfo(true);
      setActiveMarker(coords.nativeEvent);
    }
  };

  // handles map onPress action
  const mapOnPressHandler = (coords) => {
    // save received coordinates to local variables
    const {latitude, longitude} = coords.nativeEvent.coordinate;
    // do something with saved coordinates
    if (addingMarkerActive) {
      if (markerTitle !== '') {
        const title = markerTitle;
        // add a marker with given coords to markers array
        setMarkers([...markers, {title, latitude, longitude}]);
        setMarkerTitle('');
      } else {
        console.log('enter title!'); // refactor error to show in UI
      }
    } else if (deletingMarkerActive) {
    } else if (routeActive) {
    } else if (mapSearchActive) {
    } else {
      setShowPlaceInfo(false);
    }
  };

  return (
    <View style={styles.flex}>
      {/* DYNAMIC MAP VIEW */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.flex}
        customMapStyle={googleMapStyle}
        initialRegion={extractRegion()}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
        loadingIndicatorColor={Colors.primary}
        loadingBackgroundColor={Colors.background}
        tintColor={Colors.primary}
        onPoiClick={(event) => {
          setShowPlaceInfo(true);
          setActiveMarker(event.nativeEvent);
        }}
        onPress={(event) => mapOnPressHandler(event)}>
        {/* RENDER MARKERS */}
        {markers.map(
          (marker) =>
            markers && (
              <MapView.Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                pinColor={Colors.primary}
                onPress={(event) => markerOnPressHandler(event)}>
                <MapView.Callout onPress={() => setShowPlaceInfo(true)}>
                  <Text>{marker.title}</Text>
                  <Text>{marker.description}</Text>
                </MapView.Callout>
              </MapView.Marker>
            ),
        )}
      </MapView>

      {/* INTERACTIVE OVERLAY */}
      <View style={styles.overlay}>
        <View style={styles.actionBar}>
          {/* GO BACK */}
          <View>
            <TouchableOpacity
              styles={styles.button}
              onPress={() => props.navigation.goBack()}>
              <MaterialIcon name="arrow-back" style={styles.icon} />
            </TouchableOpacity>
          </View>

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
          {/* <View
            style={{
              backgroundColor: routeActive ? Colors.background : Colors.cards,
            }}>
            <TouchableOpacity
              styles={styles.button}
              onPress={routeActivityHandler}>
              <Icon name="map-marker-path" style={styles.icon} />
            </TouchableOpacity>
          </View> */}

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

        {/** USER INPUT */}
        <View style={{alignItems: 'center'}}>
          {/* SEARCH BAR: render when mapSearchActive is true */}
          {mapSearchActive && (
            <View style={styles.inputContainer}>
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

          {/* TITLE: render when addingMarkerActive is true */}
          {addingMarkerActive && (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Add title"
                placeholderTextColor={'grey'}
                style={styles.input}
                onChangeText={(text) => setMarkerTitle(text)}
                value={markerTitle}
              />
            </View>
          )}
        </View>
      </View>

      {/* SHOW PLACE INFO: render when showPlaceInfo is true */}
      {showPlaceInfo && (
        <View style={styles.showInfoOverlay}>
          <View style={{padding: 10}}>
            <Text style={{color: Colors.text}}>{activeMarker.title}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Map;
