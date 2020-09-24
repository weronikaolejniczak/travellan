import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Toolbar = (props) => {
  return (
    <View style={props.styles.toolbar}>
      {/* closing button with close icon */}
      <TouchableOpacity onPress={props.onPressClose}>
        <Icon name="close" size={28} style={props.styles.text} />
      </TouchableOpacity>

      {/* accepting button with check icon */}
      {!props.sending && !props.accepted && (
        <TouchableOpacity onPress={props.onPressCheck}>
          <Icon name="check" size={28} style={props.styles.text} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Toolbar;
