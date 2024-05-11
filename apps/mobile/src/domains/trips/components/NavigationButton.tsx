import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from 'constants/Colors';

const { height } = Dimensions.get('window');

const NavigationButton = (props) => {
  const { navigation, to, tripId, icon, startDate, endDate, cityCode } = props;

  const styles = {
    button: {
      alignItems: 'center',
      backgroundColor: Colors.primary,
      borderRadius: 20,
      height: height * 0.2,
      justifyContent: 'center',
      marginVertical: height * 0.01,
      padding: 15,
      width: '45%',
    },
    buttonText: {
      color: Colors.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate(to, {
          cityCode,
          endDate,
          startDate,
          tripId,
        });
      }}
    >
      <Text style={styles.buttonText}>{to}</Text>
      <Icon name={icon} size={42} color={Colors.text} />
    </TouchableOpacity>
  );
};

export default NavigationButton;
