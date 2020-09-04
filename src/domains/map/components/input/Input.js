import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Input = (props) => {
  switch (props.type) {
    case 'search':
      return (
        <View style={{alignItems: 'center'}}>
          <View style={props.styles.inputContainer}>
            <TextInput
              placeholder="Address or name of place"
              placeholderTextColor={'grey'}
              style={props.styles.input}
              onChangeText={(text) => props.setPlaceToSearch(text)}
              value={props.placeToSearch}
            />
            <View style={{position: 'absolute', right: 0}}>
              <TouchableOpacity styles={props.styles.button}>
                <Icon name="search" style={props.styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    case 'title':
      return (
        <View style={{alignItems: 'center'}}>
          <View style={props.styles.inputContainer}>
            <TextInput
              placeholder="Add title"
              placeholderTextColor={'grey'}
              style={props.styles.input}
              onChangeText={(text) => props.setMarkerTitle(text)}
              value={props.markerTitle}
            />
          </View>
        </View>
      );
  }
};

export default Input;
