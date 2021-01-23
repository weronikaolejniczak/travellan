import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { styles } from './HotelCardActionsStyle';

const HotelCardActions = ({ onPDF, onMap, onEdit }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPDF} style={styles.button}>
      <Icon name="pdf-box" style={styles.icon} />
    </TouchableOpacity>

    <TouchableOpacity onPress={onMap} style={styles.button}>
      <Icon name="map" style={styles.icon} />
    </TouchableOpacity>

    <TouchableOpacity onPress={onEdit} style={styles.button}>
      <Icon name="pencil" style={styles.icon} />
    </TouchableOpacity>
  </View>
);

export default memo(HotelCardActions);
