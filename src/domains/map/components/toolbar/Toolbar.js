import React from 'react';
import {View} from 'react-native';
/* imports from within the module */
import ToolbarButton from 'map/components/toolbar/Toolbar';
import Input from 'map/components/input/Input';

const Toolbar = (props) => {
  return (
    <View style={props.styles.overlay}>
      <View style={props.styles.actionBar}>
        {/* go back button */}
        <ToolbarButton
          type={'goBack'}
          styles={props.styles}
          navigation={props.navigation}
        />
        {/* add marker button */}
        <ToolbarButton
          type={'addMarker'}
          styles={props.styles}
          navigation={props.navigation}
          addingMarkerActive={props.addingMarkerActive}
          addingActivityHandler={props.addingActivityHandler}
        />
        {/* delete marker button */}
        <ToolbarButton
          type={'deleteMarker'}
          styles={props.styles}
          navigation={props.navigation}
          deletingMarkerActive={props.deletingMarkerActive}
          deletingActivityHandler={props.deletingActivityHandler}
        />
        {/* route button */}
        <ToolbarButton
          type={'route'}
          styles={props.styles}
          navigation={props.navigation}
          routeActive={props.routeActive}
          routeActivityHandler={props.routeActivityHandler}
        />
        {/* search button */}
        <ToolbarButton
          type={'search'}
          styles={props.styles}
          navigation={props.navigation}
          mapSearchActive={props.mapSearchActive}
          searchActivityHandler={props.searchActivityHandler}
        />
        {/* input field */}
        {props.mapSearchActive && (
          <Input
            type={'search'}
            styles={props.styles}
            placeToSearch={props.placeToSearch}
            setPlaceToSearch={props.setPlaceToSearch}
          />
        )}
        {props.addingMarkerActive && (
          <Input
            type={'title'}
            styles={props.styles}
            markerTitle={props.markerTitle}
            setMarkerTitle={props.setMarkerTitle}
          />
        )}
      </View>
    </View>
  );
};

export default Toolbar;
