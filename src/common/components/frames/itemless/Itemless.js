import React from 'react';
import {View, Text} from 'react-native';

import {itemlessStyle as styles} from './ItemlessStyle';

const Itemless = (props) => {
  let message = props.message;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

export default Itemless;
