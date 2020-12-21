import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from 'constants/Colors';

const { height } = Dimensions.get('window');

const NavigationButton = (props) => {
  const { navigation, to, tripId, icon } = props;

  const styles = {
    button: {
      borderRadius: 20,
      backgroundColor: Colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      width: '45%',
      height: height * 0.2,
      padding: 15,
      marginVertical: height * 0.01,
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: Colors.text,
    },
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate(to, { tripId });
      }}
    >
      <Text style={styles.buttonText}>{to}</Text>
      <Icon name={icon} size={42} color={Colors.text} />
    </TouchableOpacity>
  );
};

export default NavigationButton;
