import React from 'react';
import {View} from 'react-native';
/** IMPORTS FROM WITHIN THE MODULE */
import {cardStyle as styles} from './CardStyle';

const Card = (props) => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

export default Card;
