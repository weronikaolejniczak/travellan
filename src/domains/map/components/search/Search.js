import React from 'react';
import {View, TextInput, FlatList} from 'react-native';
/* imports from within the module */
import SearchResult from 'map/components/searchResult/SearchResult';

const Search = (props) => {
  /* handlers */
  // changes the state showAutocomplete
  const changeState = (boolean, previousState) => {
    if (boolean === true && previousState === false) {
      props.setShowAutocomplete(true);
    } else if (boolean === false && previousState === true) {
      props.setShowAutocomplete(false);
    }
  };

  // handles behavior when text changes
  const onChangeTextHandler = (text) => {
    if (text.length > 3) {
      changeState(true, props.showAutocomplete);
    } else if (text.length < 1) {
      changeState(false, props.showAutocomplete);
    }
    props.setPlaceToSearch(text);
  };

  return (
    <View style={{alignItems: 'center'}}>
      <View style={props.styles.inputContainer}>
        {/* search input */}
        <TextInput
          placeholder="Address or name of place"
          placeholderTextColor={'grey'}
          style={props.styles.input}
          onChangeText={(text) => onChangeTextHandler(text)}
          value={props.placeToSearch}
        />
      </View>
      {/* autocomplete results */}
      {props.showAutocomplete && !!props.autocomplete && (
        <FlatList
          data={props.autocomplete}
          keyExtractor={(item) => item.place_id}
          renderItem={(item) => (
            <SearchResult
              styles={props.styles}
              result={item}
              placeToSearch={props.placeToSearch}
              setPlaceToSearch={props.setPlaceToSearch}
              searchedPlace={props.searchedPlace}
              setSearchedPlace={props.setSearchedPlace}
              setShowAutocomplete={props.setShowAutocomplete}
            />
          )}
        />
      )}
    </View>
  );
};

export default Search;
