import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Constants/Colors';

// constants for responsive design
const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.4;
export const cardWidth = width * 0.9;
export const spacingForCardInset = width * 0.03;

/**
 * TODO:
 * refactor Colors
 * refactor Fonts
 * refactor Metrics
 */
export const noteItemStyle = StyleSheet.create({
  noteCard: {
    width: cardWidth,
    paddingHorizontal: cardWidth * 0.1,
    paddingVertical: cardHeight * 0.05,
    marginVertical: cardHeight * 0.05,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: cardHeight * 0.08,
    padding: cardHeight * 0.025,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bodyMargin: {
    marginTop: cardHeight * 0.2,
  },
  // refactor the triple Colors.text
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  subtitle: {
    flex: 1,
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'justify',
  },
  icon: {
    fontSize: 30,
    color: Colors.text,
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
  alignText: {
    alignItems: 'flex-start',
  },
});
