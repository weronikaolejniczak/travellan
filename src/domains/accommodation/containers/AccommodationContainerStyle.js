import { Dimensions, Platform, StyleSheet } from 'react-native';

import { Colors } from 'constants';

const { height, width } = Dimensions.get('window');
export const cardHeight = height * 0.83;
export const cardWidth = width * 0.923;
export const spacingForCardInset = width * 0.03;

export const styles = StyleSheet.create({
  accommodation: {
    borderRadius: 15,
    height: cardHeight,
    marginHorizontal: width * 0.01,
    overflow: 'hidden',
    width: cardWidth,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    margin: 10,
    padding: 15,
    width: '40%',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  centered: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  columnAndRowCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Platform.OS === 'android' ? spacingForCardInset : 0,
    paddingTop: '12%',
  },
  contentInsetIOS: {
    bottom: 0,
    left: spacingForCardInset,
    right: spacingForCardInset,
    top: 0,
  },
  dot: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    height: 10,
    margin: 8,
    width: 10,
  },
  icon: {
    margin: 10,
  },
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
  },
});
