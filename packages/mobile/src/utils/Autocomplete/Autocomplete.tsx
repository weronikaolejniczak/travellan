import React, { memo } from 'react';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import { Text, TextInput } from 'utils';
import { styles } from './AutocompleteStyle';

const CustomAutocomplete = ({
  data,
  query,
  error,
  onChange,
  onPress,
  keyExtractor,
  textInputLabel,
  itemLabel,
}) => (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
    <Autocomplete
      data={data}
      style={styles.input}
      inputContainerStyle={styles.input}
      defaultValue={query}
      listStyle={styles.result}
      keyExtractor={keyExtractor}
      renderTextInput={() => (
        <TextInput
          label={textInputLabel}
          error={error}
          value={query}
          onChange={onChange}
        />
      )}
      renderItem={({ item, i }) => (
        <TouchableOpacity style={styles.result} onPress={() => onPress(item)}>
          <Text>{itemLabel(item)}</Text>
        </TouchableOpacity>
      )}
    />
  </KeyboardAvoidingView>
);

export default memo(CustomAutocomplete);
