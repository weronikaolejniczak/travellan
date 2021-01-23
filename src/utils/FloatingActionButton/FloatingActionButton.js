import * as React from 'react';
import { FAB } from 'react-native-paper';
import { styles } from './FloatingActionButtonStyle';

const FloatingActionButton = ({ onPress }) => (
  <>
    <FAB style={styles.fab} small icon="plus" onPress={onPress} />
  </>
);

export default FloatingActionButton;
