import React, { memo } from 'react';
import { Searchbar } from 'react-native-paper';

const CustomSearchbar = ({ icon, onChangeText, placeholder, value }) => (
  <Searchbar
    icon={icon}
    onChangeText={onChangeText}
    placeholder={placeholder || 'Search'}
    value={value}
  />
);

export default memo(CustomSearchbar);
