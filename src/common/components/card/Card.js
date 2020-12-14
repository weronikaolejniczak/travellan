import React from 'react';
import {View} from 'react-native';

import {styles} from './CardStyle';

const Card = ({style, children}) => {
  return <View style={{...styles.card, ...style}}>{children}</View>;
};

export default Card;
