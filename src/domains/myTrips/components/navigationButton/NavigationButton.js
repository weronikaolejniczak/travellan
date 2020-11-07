import React from 'react';
import {TouchableOpacity, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/* imports from within the module */
import Colors from 'constants/Colors';

const NavigationButton = (props) => {
  return (
    <TouchableOpacity
      style={props.styles.button}
      onPress={() => {
        props.navigation.navigate(props.screenToNavigateTo, {
          tripId: props.id,
        });
      }}>
      <Text style={props.styles.buttonText}>{props.screenToNavigateTo}</Text>
      <Icon
        name={Platform.OS === 'android' ? props.androidIcon : props.iOSIcon}
        size={42}
        color={Colors.text}
      />
    </TouchableOpacity>
  );
};

export default NavigationButton;
