import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
/* imports from within the module */
import * as mapActions from 'map/state/Actions';
import PointOfInterest from 'map/models/PointOfInterest';
import Toolbar from 'map/components/toolbar/Toolbar';
import PlaceOverview from 'map/components/placeOverview/PlaceOverview';
import {darkModeMap} from './DarkModeMap';
import {mapStyle as styles} from './MapStyle';
import Colors from 'constants/Colors';
import {Autocomplete} from 'map/data/DummyAutocomplete';

const Map = (props) => {
  const dispatch = useDispatch();
  // selected trip's id
  const tripId = props.route.params.tripId;
  // trip selector
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  // current position on the map
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
  // user's position on the map
  const [currentPosition, setCurrentPosition] = useState(selectedTrip.region);
  // data to polyfill the map
  const [currentRegion, setCurrentRegion] = useState(selectedTrip.region);
  const [markers, setMarkers] = useState(
    selectedTrip.map ? selectedTrip.map.nodes : [],
  );
  const [routes, setRoutes] = useState([]);
  // toolbar handlers
  const [addingMarkerActive, setAddingMarkerActive] = useState(false);
  const [deletingMarkerActive, setDeletingMarkerActive] = useState(false);
  const [routeActive, setRouteActive] = useState(false);
  const [mapSearchActive, setMapSearchActive] = useState(false);
  // place details handler
  const [showPlaceInfo, setShowPlaceInfo] = useState(false);
  // input handlers
  const [markerTitle, setMarkerTitle] = useState('');
  const [placeToSearch, setPlaceToSearch] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  // marker handlers
  const [activeMarker, setActiveMarker] = useState();
  const [searchedPlace, setSearchedPlace] = useState();
  // other handlers
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // dummy autocomplete data
  const AUTOCOMPLETE = Autocomplete;

  /* handlers */
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
      (err) => setError(err.message),
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
          setSearchedPlace();
          setPlaceToSearch('');
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
          setMapSearchActive(false);
          setRouteActive(false);
          setSearchedPlace();
          setPlaceToSearch('');
          setMarkerTitle('');
          setShowPlaceInfo(false);
        }
        setDeletingMarkerActive(!deletingMarkerActive);
        setShowPlaceInfo(false);
        break;
      case 'route':
        if (!routeActive) {
          setAddingMarkerActive(false);
          setDeletingMarkerActive(false);
          setMapSearchActive(false);
          setSearchedPlace();
          setPlaceToSearch('');
          setMarkerTitle('');
          setShowPlaceInfo(false);
        }
        setRouteActive(!routeActive);
        setShowPlaceInfo(false);
        break;
      case 'search':
        if (!mapSearchActive) {
          setAddingMarkerActive(false);
          setDeletingMarkerActive(false);
          setRouteActive(false);
          setMarkerTitle('');
          setShowPlaceInfo(false);
        } else {
          setSearchedPlace();
          setPlaceToSearch('');
          setShowPlaceInfo(false);
        }
        setMapSearchActive(!mapSearchActive);
        break;
    }
  };

  // handles persistence - saves the updated map object when exiting map
  const onExitHandler = async () => {
    // start loading
    setIsLoading(true);
    // update entities on the map such as markers and routes
    try {
      await dispatch(
        mapActions.updateMap(tripId, markers, routes, currentRegion),
      ).then(() => {
        setIsLoading(false);
        props.navigation.goBack();
      });
    } catch {
      setError('Something went wrong. Check your internet connection!');
    }
  };

  // handles marker onPress action
  const markerOnPressHandler = async (coords) => {
    // save received coordinates to local variables
    const {latitude, longitude} = coords.nativeEvent.coordinate;
    // find the pressed marker's info
    let marker = markers.filter(
      (item) => item.lat === latitude && item.lon === longitude,
    )[0];
    // do something with saved coordinates
    if (deletingMarkerActive) {
      // filter markers so that they exclude the marker with the coordinates
      setMarkers(markers.filter((item) => item.id !== marker.id));
    } else {
      setActiveMarker(marker);
    }
  };

  // handles map onPress action
  const mapOnPressHandler = async (coords) => {
    // save received coordinates to local variables
    const {latitude, longitude} = coords.nativeEvent.coordinate;
    // do something with saved coordinates
    if (addingMarkerActive) {
      if (markerTitle !== '') {
        const title = markerTitle;
        // refresh markers
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
        // clear marker title
        setMarkerTitle('');
      } else {
        setError('Enter the title'); // refactor error to show in UI
      }
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
        {/* render markers */}
        {!searchedPlace &&
          !!markers &&
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
        {/* render searchedPlace */}
        {!!searchedPlace && (
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(searchedPlace.lat),
              longitude: parseFloat(searchedPlace.lon),
            }}
            pinColor={Colors.primary}
            onPress={(event) => markerOnPressHandler(event)}>
            <MapView.Callout onPress={() => setShowPlaceInfo(true)}>
              <Text>{searchedPlace.title}</Text>
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
        setMarkerTitle={(text) => setMarkerTitle(text)}
        deletingMarkerActive={deletingMarkerActive}
        deletingActivityHandler={() => activityHandler('deleting')}
        routeActive={routeActive}
        routeActivityHandler={() => activityHandler('route')}
        mapSearchActive={mapSearchActive}
        searchActivityHandler={() => activityHandler('search')}
        placeToSearch={placeToSearch}
        setPlaceToSearch={(text) => setPlaceToSearch(text)}
        autocomplete={AUTOCOMPLETE}
        showAutocomplete={showAutocomplete}
        setShowAutocomplete={() => setShowAutocomplete(!showAutocomplete)}
        error={error}
        setError={() => setError()}
        // searchedPlace, setSearchedPlace
        searchedPlace={searchedPlace}
        setSearchedPlace={(place) => setSearchedPlace(place)}
        isLoading={isLoading}
        onExitHandler={async () => await onExitHandler()}
      />

      {/* render place details */}
      {showPlaceInfo && (
        <PlaceOverview styles={styles} activeMarker={activeMarker} />
      )}

      {/* render bottom actions */}
      {!!searchedPlace && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.cards,
              paddingHorizontal: 25,
              paddingVertical: 12,
              margin: 5,
              borderRadius: 50,
            }}>
            <Text style={styles.text}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.cards,
              paddingHorizontal: 25,
              paddingVertical: 12,
              margin: 5,
              borderRadius: 50,
            }}>
            <Text style={styles.text}>Discard</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Map;
