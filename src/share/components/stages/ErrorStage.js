import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
/* IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../../app/constants/Colors';

const ErrorStage = (props) => {
  return (
    <View style={styles.centered}>
      <Text style={styles.icon}>{props.err}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: Colors.text,
  },
});

export default ErrorStage;
