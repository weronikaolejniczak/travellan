import React from 'react';
import { Searchbar } from 'react-native-paper';

const CustomSearchbar = ({ value, onChangeText, placeholder }) => (
  <Searchbar
    placeholder={placeholder || 'Search'}
    onChangeText={onChangeText}
    value={value}
  />
);

export default CustomSearchbar;
