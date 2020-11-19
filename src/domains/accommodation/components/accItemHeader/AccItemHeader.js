import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {accItemHeaderStyle as styles} from './AccItemHeaderStyle';
import {Colors, Layout} from 'constants';

const AccItemHeader = (props) => {
  const {image, type, rating, name, address} = props;

  return (
    <ImageBackground style={styles.image} source={{uri: image}}>
      <LinearGradient
        colors={['transparent', Colors.cards]}
        start={{x: 0.0, y: 0.0}}
        end={{x: 0.0, y: 1.0}}
        locations={[0.4, 1]}
        style={Layout.fill}>
        <View style={styles.type}>
          <Text style={styles.text}>{type}</Text>
        </View>
        <View style={styles.rating}>
          <Text style={[styles.text, styles.header]}>{rating}</Text>
        </View>
        <View style={styles.headerOverImage}>
          <Text style={[styles.text, styles.header]}>{name}</Text>
          <Text style={[styles.text, styles.subheader]}>{address}</Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default AccItemHeader;
