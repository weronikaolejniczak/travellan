import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
/* imports from within the module */
import {searchResultStyle as styles} from './SearchResultStyle';

const SearchResult = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.setShowAutocomplete(false);
        props.setSearchedPlace(props.result.item);
      }}
      activeOpacity={0.4}>
      <View style={styles.container}>
        <Text style={props.styles.text} numberOfLines={1}>
          {props.result.class === 'road'
            ? props.result.item.display_address
            : props.result.item.display_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResult;
