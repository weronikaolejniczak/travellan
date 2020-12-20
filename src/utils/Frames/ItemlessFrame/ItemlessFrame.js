import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './ItemlessFrameStyle';

const ItemlessFrame = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ItemlessFrame;
