import React from 'react';
import {View} from 'react-native';
/* imports from within the module */
import ToolbarButton from 'map/components/toolbarButton/ToolbarButton';
import Input from 'map/components/input/Input';

const Toolbar = (props) => {
  return (
    <View style={props.styles.overlay}>
      <View style={props.styles.actionBar}>
        {/* go back button */}
        <ToolbarButton
          iconName={'close'}
          isLoading={props.isLoading}
          loader={true}
          handler={false}
          onPress={props.onExitHandler}
        />
        {/* add marker button */}
        <ToolbarButton
          iconName={'map-marker-plus'}
          isLoading={props.isLoading}
          loader={false}
          handler={props.addingMarkerActive}
          onPress={props.addingActivityHandler}
        />
        {/* delete marker button */}
        <ToolbarButton
          iconName={'map-marker-minus'}
          isLoading={props.isLoading}
          loader={false}
          handler={props.deletingMarkerActive}
          onPress={props.deletingActivityHandler}
        />
        {/* route button */}
        {/* <ToolbarButton
          iconName={'map-marker-path'}
          isLoading={props.isLoading}
          loader={true}
          handler={props.routeActive}
          onPress={props.routeActivityHandler}
        /> */}
        {/* search button */}
        {/* <ToolbarButton
          iconName={'map-search'}
          isLoading={props.isLoading}
          loader={false}
          handler={props.mapSearchActive}
          onPress={props.searchActivityHandler}
        /> */}
      </View>
      {/* input field */}
      {/* search for address, place, autocomplete */}
      {props.mapSearchActive && (
        <Input
          type={'search'}
          styles={props.styles}
          placeToSearch={props.placeToSearch}
          setPlaceToSearch={props.setPlaceToSearch}
          autocomplete={props.autocomplete}
          showAutocomplete={props.showAutocomplete}
          setShowAutocomplete={props.setShowAutocomplete}
          searchedPlace={props.searchedPlace}
          setSearchedPlace={props.setSearchedPlace}
          error={props.error}
          setError={props.setError}
        />
      )}
      {/* declare title for custom marker */}
      {props.addingMarkerActive && (
        <Input
          type={'title'}
          styles={props.styles}
          markerTitle={props.markerTitle}
          setMarkerTitle={props.setMarkerTitle}
        />
      )}
    </View>
  );
};

export default Toolbar;
