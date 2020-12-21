import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Input = (props) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={props.styles.inputContainer}>
        <TextInput
          placeholder="Add title"
          placeholderTextColor={'grey'}
          style={props.styles.input}
          onChangeText={(text) => props.setMarkerTitle(text)}
          value={props.markerTitle}
        />
      </View>
      {!!props.error && <Text>{props.error}</Text>}
    </View>
  );
};

export default Input;
