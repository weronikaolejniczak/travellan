import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';

import { styles } from './RoundButtonStyle';

const RoundButton = ({ color, iconName, onPress }) => (
  <TouchableOpacity style={[styles.roundButton, { backgroundColor: color }]}>
    <Icon name={iconName} onPress={onPress} />
  </TouchableOpacity>
);

export default memo(RoundButton);
