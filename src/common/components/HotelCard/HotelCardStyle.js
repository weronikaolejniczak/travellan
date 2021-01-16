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
    padding: 15,
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
    height: height * 0.4,
    resizeMode: 'contain',
    width: 'auto',
  },
  linearGradient: {
    flex: 1,
  },
  placeholder: {
    color: Colors.placeholder,
  },
  subheading: {
    color: Colors.text,
    textAlign: 'center',
  },
  text: {
    color: Colors.text,
  },
});
