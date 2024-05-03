import { Dimensions, StyleSheet } from 'react-native';

import Colors from 'constants/Colors';

const { height, width } = Dimensions.get('window');
const cardHeight = 0.4 * height;

export const styles = StyleSheet.create({
  actions: {
    bottom: '4%',
    position: 'absolute',
    right: 0,
  },
  alignRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '4%',
  },
  date: {
    fontSize: 14,
  },
  destination: {
    fontSize: 22,
  },
  details: {
    padding: '5%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: cardHeight * 0.65,
    width: '100%',
  },
  text: {
    color: Colors.text,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  tripCard: {
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.02,
    position: 'relative',
  },
});
