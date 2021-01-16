import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from 'constants';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  caption: {
    color: Colors.placeholder,
  },
  caution: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  checkInAndCheckOutHoursWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkInWrapper: {
    paddingHorizontal: '3%',
    paddingLeft: 0,
  },
  checkOutWrapper: {
    paddingHorizontal: '3%',
  },
  content: {
    padding: '4%',
  },
  header: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    padding: '1%',
  },
  headline: {
    color: Colors.text,
    textAlign: 'center',
  },
  image: {
    height: height * 0.45,
    width: '100%',
  },
  linearGradient: {
    flex: 1,
  },
  subheading: {
    color: Colors.text,
    textAlign: 'center',
  },
  text: {
    color: Colors.text,
  },
});
