import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
/* imports from within the module */
import {searchResultStyle as styles} from './SearchResultStyle';

const SearchResult = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.setShowAutocomplete(false);
        //console.log(props.result);
      }}
      style={{width: '100%', height: 50}}
      activeOpacity={0.4}>
      <View style={styles.container}>
        <Text style={props.styles.text} numberOfLines={1}>
          {props.result.class === 'road'
            ? props.result.display_address
            : props.result.display_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResult;
