import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Search from 'map/components/search/Search';

const Input = (props) => {
  switch (props.type) {
    case 'search':
      return (
        <Search
          styles={props.styles}
          setPlaceToSearch={props.setPlaceToSearch}
          placeToSearch={props.placeToSearch}
          autocomplete={props.autocomplete}
          showAutocomplete={props.showAutocomplete}
          setShowAutocomplete={props.setShowAutocomplete}
          searchedPlace={props.searchedPlace}
          setSearchedPlace={props.setSearchedPlace}
        />
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
          {!!props.error && <Text>{props.error}</Text>}
        </View>
      );
  }
};

export default Input;
