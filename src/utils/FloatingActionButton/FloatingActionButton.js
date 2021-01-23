import React, { memo } from 'react';
import { FAB } from 'react-native-paper';

import { styles } from './FloatingActionButtonStyle';

const FloatingActionButton = ({ onPress, loading, disabled }) => (
  <FAB
    style={styles.fab}
    small
    icon="plus"
    onPress={!disabled && onPress}
    loading={loading}
    animated
  />
);

export default memo(FloatingActionButton);
