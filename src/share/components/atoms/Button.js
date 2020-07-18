import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
/* IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../../app/constants/Colors';

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: '2%',
    padding: '4%',
    borderRadius: 25,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
  },
  text: {
    color: Colors.text,
  },
});

export default Button;
