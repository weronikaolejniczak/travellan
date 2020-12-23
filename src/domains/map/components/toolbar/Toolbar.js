import React from 'react';
import {View} from 'react-native';

import ToolbarButton from 'domains/map/components/toolbarButton/ToolbarButton';
import Input from 'domains/map/components/input/Input';

const Toolbar = (props) => {
  return (
    <View style={props.styles.overlay}>
      <View style={props.styles.actionBar}>
        <ToolbarButton
          iconName="close"
          isLoading={props.isLoading}
          loader={true}
          handler={false}
          onPress={props.onExitHandler}
        />
        <ToolbarButton
          iconName="map-marker-plus"
          isLoading={props.isLoading}
          loader={false}
          handler={props.addingMarkerActive}
          onPress={props.addingActivityHandler}
        />
        <ToolbarButton
          iconName="map-marker-minus"
          isLoading={props.isLoading}
          loader={false}
          handler={props.deletingMarkerActive}
          onPress={props.deletingActivityHandler}
        />
        {props.addingMarkerActive && (
          <Input
            type="title"
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
