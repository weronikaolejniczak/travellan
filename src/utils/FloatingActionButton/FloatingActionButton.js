import * as React from 'react';
import { FAB } from 'react-native-paper';
import { styles } from './FloatingActionButtonStyle';

const FloatingActionButton = ({ onPress, loading }) => (
  <FAB
    style={[styles.fab]}
    icon="plus"
    onPress={onPress}
    loading={loading}
    animated
  />
);

export default FloatingActionButton;
