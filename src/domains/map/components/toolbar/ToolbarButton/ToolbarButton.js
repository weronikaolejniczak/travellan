import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { Colors } from 'constants';
import { styles } from './ToolbarButtonStyle';

const ToolbarButton = ({ handler, loader, isLoading, icon, onPress }) => (
  <View
    style={{
      backgroundColor: handler ? Colors.background : Colors.cards,
    }}
  >
    <TouchableOpacity styles={styles.button} onPress={onPress}>
      {loader && isLoading ? (
        <View style={styles.button}>
          <ActivityIndicator size="small" color={Colors.text} />
        </View>
      ) : (
        <Icon name={icon} style={styles.icon} />
      )}
    </TouchableOpacity>
  </View>
);

export default ToolbarButton;
