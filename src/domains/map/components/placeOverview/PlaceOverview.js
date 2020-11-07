import React from 'react';
import {View, Text} from 'react-native';
/* imports from within the module */
import Colors from 'constants/Colors';

const PlaceOverview = (props) => {
  return (
    <View style={props.styles.showInfoOverlay}>
      <View style={{padding: 10}}>
        <Text style={{color: Colors.text}}>{props.activeMarker.title}</Text>
      </View>
    </View>
  );
};

export default PlaceOverview;
