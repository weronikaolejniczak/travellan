import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/* imports from within the module */
import Colors from 'constants/Colors';

/* refactor icon buttons into smaller component */
const ToolbarButton = (props) => {
  switch (props.type) {
    case 'goBack':
      return (
        <View>
          <TouchableOpacity
            styles={props.styles.button}
            onPress={() => props.navigation.goBack()}>
            <Icon name="close" style={props.styles.icon} />
          </TouchableOpacity>
        </View>
      );
    case 'addMarker':
      return (
        <View
          style={{
            backgroundColor: props.addingMarkerActive
              ? Colors.background
              : Colors.cards,
          }}>
          <TouchableOpacity
            styles={props.styles.button}
            onPress={props.addingActivityHandler}>
            <Icon name="map-marker-plus" style={props.styles.icon} />
          </TouchableOpacity>
        </View>
      );
    case 'deleteMarker':
      return (
        <View
          style={{
            backgroundColor: props.deletingMarkerActive
              ? Colors.background
              : Colors.cards,
          }}>
          <TouchableOpacity
            styles={props.styles.button}
            onPress={props.deletingActivityHandler}>
            <Icon name="map-marker-minus" style={props.styles.icon} />
          </TouchableOpacity>
        </View>
      );
    case 'route':
      return (
        <View
          style={{
            backgroundColor: props.routeActive
              ? Colors.background
              : Colors.cards,
          }}>
          <TouchableOpacity
            styles={props.styles.button}
            onPress={props.routeActivityHandler}>
            <Icon name="map-marker-path" style={props.styles.icon} />
          </TouchableOpacity>
        </View>
      );
    case 'search':
      return (
        <View
          style={{
            backgroundColor: props.mapSearchActive
              ? Colors.background
              : Colors.cards,
          }}>
          <TouchableOpacity
            styles={props.styles.button}
            onPress={props.searchActivityHandler}>
            <Icon name="map-search" style={props.styles.icon} />
          </TouchableOpacity>
        </View>
      );
  }
};

export default ToolbarButton;
