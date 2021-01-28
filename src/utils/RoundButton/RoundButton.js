import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { memo } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Colors } from 'constants';
import { styles } from './RoundButtonStyle';

const RoundButton = ({ disabled, loading, color, iconName, onPress }) => (
  <TouchableOpacity
    onPress={disabled ? () => {} : onPress}
    style={[styles.roundButton, { backgroundColor: color }]}
  >
    {loading ? (
      <ActivityIndicator color={Colors.background} />
    ) : (
      <Icon style={styles.icon} name={iconName} />
    )}
  </TouchableOpacity>
);

export default memo(RoundButton);
