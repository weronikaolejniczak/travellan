import { Dimensions, StyleSheet } from 'react-native';

import Colors from 'constants/Colors';

const { height, width } = Dimensions.get('window');
const cardHeight = 0.4 * height;

export const styles = StyleSheet.create({
  tripCard: {
    position: 'relative',
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.02,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: cardHeight * 0.65,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
