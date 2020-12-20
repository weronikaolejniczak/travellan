import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../../utils/Card/node_modules/constants/Colors';

const {height, width} = Dimensions.get('window');
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
  actions: {
    position: 'absolute',
    right: 0,
    bottom: '4%',
  },
  text: {
    color: Colors.text,
  },
  details: {
    padding: '5%',
  },
  destination: {
    fontSize: 22,
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
