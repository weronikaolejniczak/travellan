import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
/* imports from within the module */
import Toolbar from 'map/components/toolbar/Toolbar';
import PlaceOverview from 'map/components/placeOverview/PlaceOverview';
import {googleMapStyle} from './GoogleMapStyle';
import {mapStyle as styles} from './MapStyle';
import Colors from 'constants/Colors';
import {Autocomplete} from 'map/data/DummyAutocomplete';

const Map = (props) => {
  /* variables */
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const extractRegion = () => {
    return selectedTrip.region;
  };
  /* with setters */
  const [currentPosition, setCurrentPosition] = useState(selectedTrip.region);
  const [markers, setMarkers] = useState([]);
  const [addingMarkerActive, setAddingMarkerActive] = useState(false);
  const [deletingMarkerActive, setDeletingMarkerActive] = useState(false);
  const [routeActive, setRouteActive] = useState(false);
  const [mapSearchActive, setMapSearchActive] = useState(false);
  const [showPlaceInfo, setShowPlaceInfo] = useState(false);
  const [placeToSearch, setPlaceToSearch] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeMarker, setActiveMarker] = useState();
  const [markerTitle, setMarkerTitle] = useState('');
  const [focusedPlace, setFocusedPlace] = useState();

  const AUTOCOMPLETE = Autocomplete;

  /** handlers */
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

  // handles activity on the toolbar
  const activityHandler = (type) => {
    switch (type) {
      case 'adding':
        if (!addingMarkerActive) {
          setDeletingMarkerActive(false);
          setMapSearchActive(false);
          setRouteActive(false);
        }
        setAddingMarkerActive(!addingMarkerActive);
        break;
      case 'deleting':
        if (!deletingMarkerActive) {
          setAddingMarkerActive(false);
          setMapSearchActive(false);
          setRouteActive(false);
        }
        setDeletingMarkerActive(!deletingMarkerActive);
        break;
      case 'route':
        if (!routeActive) {
          setAddingMarkerActive(false);
          setDeletingMarkerActive(false);
          setMapSearchActive(false);
        }
        setRouteActive(!routeActive);
        break;
      case 'search':
        if (!mapSearchActive) {
          setAddingMarkerActive(false);
          setDeletingMarkerActive(false);
          setRouteActive(false);
        }
        setMapSearchActive(!mapSearchActive);
        break;
    }
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
      /* } else if (deletingMarkerActive) {
    } else if (routeActive) {
    } else if (mapSearchActive) { */
    } else {
      setShowPlaceInfo(false);
    }
  };

  return (
    <View style={styles.flex}>
      {/* render dynamic MapView */}
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
        {/* render markers */}
        {markers &&
          markers.map((marker) => (
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
          ))}
        {focusedPlace && (
          <MapView.Marker
            coordinate={{
              latitude: focusedPlace.lat,
              longitude: focusedPlace.lon,
            }}
            pinColor={Colors.primary}
            onPress={(event) => markerOnPressHandler(event)}>
            <MapView.Callout onPress={() => setShowPlaceInfo(true)}>
              <Text>hello</Text>
            </MapView.Callout>
          </MapView.Marker>
        )}
      </MapView>

      {/* render toolbar for map interaction */}
      <Toolbar
        styles={styles}
        navigation={props.navigation}
        addingMarkerActive={addingMarkerActive}
        addingActivityHandler={() => activityHandler('adding')}
        markerTitle={markerTitle}
        setMarkerTitle={() => setMarkerTitle()}
        deletingMarkerActive={deletingMarkerActive}
        deletingActivityHandler={() => activityHandler('deleting')}
        routeActive={routeActive}
        routeActivityHandler={() => activityHandler('route')}
        mapSearchActive={mapSearchActive}
        searchActivityHandler={() => activityHandler('search')}
        placeToSearch={placeToSearch}
        setPlaceToSearch={() => setPlaceToSearch()}
        autocomplete={AUTOCOMPLETE}
        showAutocomplete={showAutocomplete}
        setShowAutocomplete={() => setShowAutocomplete(!showAutocomplete)}
        // focusedPlace, setFocusedPlace
        focusedPlace={focusedPlace}
        setFocusedPlace={() => setFocusedPlace()}
      />

      {/* render place details */}
      {showPlaceInfo && (
        <PlaceOverview styles={styles} activeMarker={activeMarker} />
      )}
    </View>
  );
};

export default Map;
