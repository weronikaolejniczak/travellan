import React, { memo } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Colors } from 'constants';
import { Text } from 'utils';
import { styles } from './SubmitButtonStyle';

const SubmitButton = ({ isLoading, isDisabled, onPress, children }) => (
  <TouchableOpacity
    onPress={!isDisabled ? onPress : undefined}
    style={styles.button}
  >
    {isLoading && (
      <ActivityIndicator style={styles.loader} color={Colors.background} />
    )}
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

export default memo(SubmitButton);
