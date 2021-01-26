import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { styles } from './HotelCardActionsStyle';

const HotelCardActions = ({ onPDF, onDelete, onEdit }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPDF} style={styles.button}>
      <Icon name="pdf-box" style={styles.icon} />
    </TouchableOpacity>

    <TouchableOpacity onPress={onDelete} style={styles.button}>
      <Icon name="delete" style={styles.icon} />
    </TouchableOpacity>

    <TouchableOpacity onPress={onEdit} style={styles.button}>
      <Icon name="pencil" style={styles.icon} />
    </TouchableOpacity>
  </View>
);

export default memo(HotelCardActions);
