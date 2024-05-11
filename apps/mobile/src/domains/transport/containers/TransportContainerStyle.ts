import { Platform, StyleSheet } from 'react-native';

import { Colors } from 'constants';
import { spacingForCardInset } from '../components/TransportItem/TransportItemStyle';

export const styles = StyleSheet.create({
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
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Platform.OS === 'android' ? spacingForCardInset : 0,
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
  dotsWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    margin: 10,
  },
  plusButton: {
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 25,
    height: 35,
    justifyContent: 'center',
    margin: 5,
    width: 35,
  },
  plusIcon: {
    color: Colors.background,
    fontSize: 26,
  },
  scrollView: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingTop: '12%',
  },
  text: {
    color: Colors.text,
  },
});
