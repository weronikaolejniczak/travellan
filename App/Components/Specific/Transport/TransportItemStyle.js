import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../Constants/Colors';

// refactor Metrics
const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.83;
export const cardWidth = width * 0.915;
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
    marginHorizontal: 5,
    paddingTop: height * 0.0365,
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
  iconsAndLinesContainer: {
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verticalLine: {
    borderColor: Colors.primary,
    height: cardHeight * 0.075,
    borderLeftWidth: 3,
  },
  horizontalLine: {
    marginVertical: 10,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  counterContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    paddingHorizontal: cardWidth * 0.035,
    paddingVertical: cardHeight * 0.01,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
  textAndIconContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
});
