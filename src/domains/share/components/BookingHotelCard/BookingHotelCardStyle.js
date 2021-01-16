import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from 'constants';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  content: {
    padding: '4%',
  },
  header: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    height: height * 0.45,
    width: '100%',
  },
  linearGradient: {
    flex: 1,
  },
  section: {
    marginTop: '3%',
  },
  subheading: {
    color: Colors.text,
    textAlign: 'center',
  },
  text: {
    color: Colors.text,
  },
});
