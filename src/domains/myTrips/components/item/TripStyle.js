import {StyleSheet, Dimensions} from 'react-native';
import Colors from 'constants/Colors';

const {height, width} = Dimensions.get('window');
const cardHeight = 0.4 * height;

export const tripStyle = StyleSheet.create({
  tripCard: {
    height: cardHeight,
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
  actions: {
    position: 'absolute',
    left: '80%',
    top: cardHeight * 0.715,
  },
  text: {
    color: Colors.text,
  },
  details: {
    height: cardHeight * 0.35,
    padding: '4%',
  },
  destination: {
    fontSize: 22,
    marginVertical: 4,
  },
  date: {
    fontSize: 14,
  },
  alignRow: {
    marginHorizontal: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
