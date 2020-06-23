import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Constants/Colors';

// constants for responsive design
const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.4;
export const cardWidth = width * 0.82;
export const spacingForCardInset = width * 0.1 - 13;

/**
 * TODO:
 * refactor Colors
 * refactor Fonts
 * refactor Metrics
 */
export const noteItemStyle = StyleSheet.create({
  noteCard: {
    width: cardWidth,
    marginHorizontal: 10,
    padding: 25,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 35,
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
  // refactor the triple Colors.text
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  subtitle: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 20,
    flex: 1,
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
