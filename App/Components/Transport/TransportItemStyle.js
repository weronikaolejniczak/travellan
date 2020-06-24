import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Constants/Colors';

// refactor Metrics
const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.85;
export const cardWidth = width * 0.9;
export const spacingForCardInset = width * 0.03;

/**
 * TODO:
 * refactor Colors
 * refactor Fonts
 * refactor Metrics
 */
export const transportItemStyle = StyleSheet.create({
  transportCard: {
    width: cardWidth,
    height: cardHeight,
    marginHorizontal: 10,
    padding: 25,
    borderRadius: 15,
  },
  actions: {
    flexDirection: 'row',
    padding: cardHeight * 0.018,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  // refactor the triple Colors.text
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  subtitle: {
    color: Colors.text,
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
  },
  icon: {
    fontSize: 30,
    color: Colors.text,
    marginRight: 20,
  },
  columnDirection: {
    flexDirection: 'column',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  rowCenter: {
    alignItems: 'center',
  },
});
